# Image delivery: takeaways + action plan

Notes from comparing three portfolio sites against this one (Oct 2026).
Goal: the fastest images with the least extra tooling.

---

## Where this site is now

Measured on the `main` branch:

- **Most images are on S3** (`vstaicu-portfolio-assets.s3.us-east-2.amazonaws.com`): 117 images, **46 MB total**, median 224 KB.
- **The biggest offenders:**
  - `mile10/000020710020.JPEG`: 5.3 MB
  - `mile10/edit-DSDFSDFX.jpg`: 3.4 MB
  - `mile10/coverimg-alpha-crop.png`: 2.9 MB
  - `mile10/edit-XRAY-BLURNIB-RENDER.jpg`: 2.1 MB
  - `play/twoPebbles.png`: 1.9 MB
  - 20 images in total are over 500 KB.
- **The images in `pfolio/public/imgs/` are also big:** `cases.png` is 7.2 MB, and `hand-03.png`, `edit-thediscs.png` and `hand-02.png` are 3.7–4.2 MB each.
- **S3 sends no `Cache-Control` header,** so browsers don't know how long to keep the images. Returning visitors may download them again.
- **S3 serves straight from Ohio, with no CDN.** A CDN keeps copies of files on servers around the world.
- **Every device gets one size of image.** A phone downloads the same file as a 5K monitor.
- **The good news:** many images are already WebP, and most pages already use `loading="lazy"`.

---

## What the three reference sites do

| | jeanxcrj.com | matheo-delannoy.com | yuriroga.com |
|---|---|---|---|
| **Platform** | Hand-written HTML on Vercel | WordPress + Lay Theme on OVH | Likely Kirby CMS (PHP) on Apache |
| **Format** | Progressive JPEG | WebP, swapped in automatically when the browser accepts it | WebP |
| **Sizes per image** | 1 (1.4k–4k px wide) | 1 (1920 px) | **7** (320 to 1920 px) |
| **Typical file** | 0.8–2.5 MB | ~70 KB | 24 KB (phone) to 350 KB (desktop) |
| **Lazy loading** | Native `loading="lazy"` | Native `loading="lazy"` | The lazysizes library (a script) |
| **CDN / caching** | Vercel CDN, cached for 1 h, then refreshed in the background for up to 7 days | None, 15 min | None |
| **Why it feels fast** | Progressive JPEGs show the whole image blurry right away; fade-ins hide loading | Tiny WebP files | The browser picks the smallest size that looks sharp |

### Yuri Roga's approach, in detail

The CMS generates the sizes automatically on upload. The HTML looks like this:

```html
<img class="lazyload"
     data-src="…/001.jpg"
     data-srcset="…/001-320x.webp 320w, …/001-480x.webp 480w, …/001-640x.webp 640w,
                  …/001-960x.webp 960w, …/001-1280x.webp 1280w, …/001-1600x.webp 1600w,
                  …/001-1920x.webp 1920w"
     data-sizes="auto">
```

Measured file sizes for one image:

| Version | Size |
|---|---|
| Original JPEG | 1.37 MB |
| 320 px | 23 KB |
| 640 px | 68 KB |
| 960 px | 126 KB |
| 1280 px | 191 KB |
| 1920 px | 352 KB |

`data-sizes="auto"` makes the lazysizes script measure how wide the image appears on screen. The browser then downloads only the size it needs. A phone gets the 640 px version (68 KB) instead of 1.37 MB.

**This is the best of the three.** You can get the same result without a CMS or the lazysizes script. Modern HTML does this on its own (see step 3).

---

## Action plan (lightest version)

The approach: resize and convert once, on your computer, before uploading. The site gets no new dependencies and no build plugin.

### 1. Keep originals out of the site

Keep full-resolution exports in a local folder, for example `~/PROF/portfolio-originals/`. The site only ever gets the optimized copies. Never edit or delete the originals.

### 2. Generate 3 WebP sizes per image with one script

Seven sizes, as on Yuri Roga's site, is more than you need. Three covers phones, laptops and large screens:

| Name | Width | Who gets it |
|---|---|---|
| `name-640.webp` | 640 px | Phones |
| `name-1280.webp` | 1280 px | Laptops; phones with half-width images |
| `name-1920.webp` | 1920 px | Large and retina screens |

Settings:
- **WebP at quality ~80.** All current browsers support it, including Safari 14+.
- **Keep transparency** for PNGs that need it, such as `coverimg-alpha-crop.png`. WebP supports transparency, so PNG is never needed.
- **Never upscale.** If the original is only 1000 px wide, skip the 1280 and 1920 sizes.
- **Expected result:** most images end up at 30–350 KB per size, instead of 1–7 MB.

Tool: a small Node script using the `sharp` library, saved in the repo as `scripts/optimize-images.mjs`. Ask Claude to write it. It should read the originals folder and write `name-640.webp`, `name-1280.webp` and `name-1920.webp` into an output folder. One-off alternative: Squoosh (squoosh.app), one image at a time.

### 3. Use `srcset` + `sizes` in the HTML (no lazysizes needed)

```html
<img src="…/name-1280.webp"
     srcset="…/name-640.webp 640w, …/name-1280.webp 1280w, …/name-1920.webp 1920w"
     sizes="auto, (max-width: 768px) 100vw, 50vw"
     width="1920" height="1280"
     loading="lazy" decoding="async"
     alt="…">
```

What each part does:
- **`srcset`** lists the available sizes.
- **`sizes`** tells the browser how wide the image will appear on screen, so it can pick a file before the page layout is ready.
  - `auto` tells newer Chrome and Edge to measure the actual width, which is the same as lazysizes' `data-sizes="auto"`. Other browsers ignore it and use the rules after it.
  - Write those rules to match your layout: full-width images use `100vw`, half-width images use `50vw`, and so on.
- **`width` / `height`** use the original's dimensions. They stop the page jumping as images load, because the browser reserves space using the aspect ratio. Keep `height: auto` in CSS.
- **`loading="lazy"`** and **`decoding="async"`** are native browser features, so there's no script to add.

**For the first visible image only** (hero or cover), don't lazy-load it. Tell the browser it's urgent:

```html
<img … fetchpriority="high">   <!-- no loading="lazy" -->
```

### 4. Images listed in JS files (`items.js`, `c4dItems.js`, `sketchbookItems.js`)

Most of your images are listed in JS arrays, not written into the HTML. Give each item a base path instead of a full URL, plus one helper function that builds the tag:

```js
const S3 = "https://vstaicu-portfolio-assets.s3.us-east-2.amazonaws.com";

export function imgAttrs(base, sizes = "auto, (max-width: 768px) 100vw, 50vw") {
  return {
    src: `${S3}/${base}-1280.webp`,
    srcset: [640, 1280, 1920].map(w => `${S3}/${base}-${w}.webp ${w}w`).join(", "),
    sizes,
  };
}
// items.js:  { id: "fighter", base: "play/fighter", category: "photo", w: 3000, h: 2000 }
```

With this, adding a new image means generating 3 files and adding one line to the array.

### 5. Upload to S3 with a cache header

When uploading the optimized files, set:

```
Cache-Control: public, max-age=31536000, immutable
```

This tells browsers to keep each image for a year without checking back. It's safe as long as you **never overwrite a file under the same name**. If you change an image, give it a new name (for example `fighter-v2`). The AWS command line tool can set the header on upload:

```
aws s3 cp ./out s3://vstaicu-portfolio-assets/ --recursive --cache-control "public, max-age=31536000, immutable"
```

You can also set it in the S3 web console under Metadata.

**Optional, later:** put CloudFront (Amazon's CDN) in front of the S3 bucket, so visitors outside the US get images from a nearby server. Or move the optimized images into the repo's `public/` folder, if your host has a CDN (Vercel, Netlify and GitHub Pages all do). Only do this if the site still feels slow after steps 1–5. Most of the gain comes from smaller files.

### 6. Small extras

- **Only use progressive JPEG for a JPEG fallback.** You don't need a fallback, since every current browser supports WebP.
- **Videos (23 `.webm` files on S3):** use `preload="none"` or `preload="metadata"` on any video below the first screen, plus a `poster` image (a still frame shown before playback). jeanxcrj.com does this.
- **Fade images in as they load,** as jeanxcrj.com does. A missing image then looks intentional rather than broken.

---

## Checklist

- [ ] Back up the originals to a local folder outside the repo
- [ ] Write `scripts/optimize-images.mjs` (sharp → 640 / 1280 / 1920 WebP, q≈80, no upscaling)
- [ ] Start with the worst files: the 20 S3 images over 500 KB + the big PNGs in `public/imgs/`
- [ ] Upload with `Cache-Control: public, max-age=31536000, immutable`
- [ ] Add the `imgAttrs()` helper; switch the items arrays from `url` to `base` + `w`/`h`
- [ ] Add `srcset` / `sizes` / `width` / `height` / `decoding="async"` to the `<img>` tags
- [ ] Hero image: `fetchpriority="high"`, no lazy loading
- [ ] Check in Chrome DevTools → Network tab, filtered to images, with the phone view turned on: phones should download the 640 versions
