/**
 * Landing-page projects, in display order.
 * Each project is one horizontal strip. `slides` are what you scroll through
 * before clicking in. Add/remove/reorder slides freely: a slide is either
 * { type: "image", src } or { type: "video", src }.
 */
const B = "https://vstaicu-1.b-cdn.net";
const S3 = "https://vstaicu-portfolio-assets.s3.us-east-2.amazonaws.com";

export const projects = [
  {
    href: "/fable/",
    title: "Fable • Lunar Gala 2026",
    slides: [
      { type: "video", src: `${B}/lg2026/cover-comp.mp4` },
      { type: "image", src: `${B}/lg2026/001_0740.jpg` },
      { type: "image", src: `${B}/lg2026/smokerender.jpg` },
      { type: "image", src: `${B}/lg2026/s01.jpg` },
      { type: "image", src: `${B}/lg2026/s03.jpg` },
    ],
  },
  {
    href: "/elysium/",
    title: "Elysium • Lunar Gala 2025",
    slides: [
      { type: "video", src: `${S3}/elysium/030425/act-embrace-900.webm` },
      { type: "image", src: `${S3}/elysium/compressed_HomeIterations-1.png.webp` },
      { type: "image", src: `${S3}/elysium/compressed_HomeIterations-4.png.webp` },
      { type: "image", src: `${S3}/elysium/compressed_HomeIterations-5.png.webp` },
    ],
  },
  {
    href: "/typographyAnimation/",
    title: "Athelas",
    slides: [
      { type: "video", src: `${S3}/cmini/comp_ending-audio.mov.webm` },
      { type: "video", src: `${S3}/cmini/comp_beginning_rgb.mov.webm` },
      { type: "video", src: `${S3}/cmini/comp_e-to-ligatures.mov.webm` },
      { type: "video", src: `${S3}/cmini/comp_text-jumble-audio.mov.webm` },
    ],
  },
  {
    href: "/c4d/",
    title: "C4D Explorations",
    slides: [
      { type: "video", src: `${S3}/c4d/2.7MB_COVER_comp_final-poppingPills.mov.webm` },
      { type: "video", src: `${S3}/c4d/comp_myfirsthoudinirender.mov.webm` },
    ],
  },
  {
    href: "/visionPro/",
    title: "Book Focus for Vision Pro",
    slides: [
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-1.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-2.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-3.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-4.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-8-apple.jpg` },
    ],
  },
];

/** Smaller secondary links shown under the list. */
export const moreLinks = [
  { href: "/mile10/", title: "Mile 10" },
  { href: "/play/", title: "Play" },
  { href: "/sketches/", title: "Sketches" },
];
