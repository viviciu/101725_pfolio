/**
 * Landing-page projects, in display order (the number in the top nav = position here).
 *
 * title    – serif title shown when the project is open
 * subtitle – small sans line next to the title
 * desc     – short description under the nav (\n = line break)
 * frame    – "full": media fills the whole screen (cropped to cover, like the brown/red/particle samples)
 *            "center": media fills a centered portrait frame (like the Sea Glass sample)
 * theme    – "light" | "paper" | "dark": stage + text colors (see THEMES in style.css)
 * href     – project page; leave null if the page doesn't exist yet (title isn't a link)
 * slides   – media. The landing page shows slides[0] centered on screen.
 *            { type: "image" | "video", src }
 */
const B = "https://vstaicu-1.b-cdn.net";
const S3 = "https://vstaicu-portfolio-assets.s3.us-east-2.amazonaws.com";

export const projects = [
  {
    title: "Fable",
    frame: "full",
    theme: "dark",
    subtitle: "Lunar Gala 2026",
    href: "/fable/",
    desc: "Lunar Gala is Carnegie Mellon's student-run fashion show. Each year the creative team translates the year's theme through print, web, photo, and motion design on large LED screens as models walk.\nI designed several 3D motion pieces, translating the intent of an individual fashion designer's line while maintaining the year's brand.",
    slides: [
      { type: "video", src: `${B}/lg2026/cover-comp.mp4` },
      { type: "image", src: `${B}/lg2026/001_0740.jpg` },
      { type: "image", src: `${B}/lg2026/smokerender.jpg` },
      { type: "image", src: `${B}/lg2026/s01.jpg` },
      { type: "image", src: `${B}/lg2026/s03.jpg` },
    ],
  },
  {
    title: "Elysium",
    frame: "full",
    theme: "dark",
    subtitle: "Lunar Gala 2025",
    href: "/elysium/",
    desc: "Lunar Gala is Pittsburgh's largest annual fashion show. As co-head of web and creative technologist, I creatively directed a team of 4 designers and 5 developers.\nI designed and developed the site's home page GLSL particles, a library of particle behaviors that fit this year's visual identity.",
    slides: [
      { type: "video", src: `${S3}/elysium/030425/act-embrace-900.webm` },
      { type: "image", src: `${S3}/elysium/compressed_HomeIterations-1.png.webp` },
      { type: "image", src: `${S3}/elysium/compressed_HomeIterations-4.png.webp` },
      { type: "image", src: `${S3}/elysium/compressed_HomeIterations-5.png.webp` },
    ],
  },
  {
    title: "Sea Glass",
    frame: "center",
    theme: "light",
    subtitle: "Gentle Systems Intern",
    href: null, // no /seaglass/ page yet
    desc: "Fascinated by the beauty of caustic reflections in nature, we set about finding a way to master both the reflection and refraction of light to create spectacular and unexpected memories, encoded in special objects.\nUsing technology to unleash our creativity, we are able to create customizable caustic reflections on many products to reveal a poetic reflection and light.",
    slides: [{ type: "image", src: `${S3}/play/twoPebbles.png` }],
  },
  {
    title: "C4D Explorations",
    frame: "center",
    theme: "paper",
    subtitle: "3D Motion",
    href: "/c4d/",
    desc: "A collection of Cinema 4D and Houdini experiments in 3D motion and rendering.", // placeholder: rewrite in your own words
    slides: [
      { type: "video", src: `${S3}/c4d/2.7MB_COVER_comp_final-poppingPills.mov.webm` },
      { type: "video", src: `${S3}/c4d/comp_myfirsthoudinirender.mov.webm` },
    ],
  },
  {
    title: "Book Focus",
    frame: "full",
    theme: "dark",
    subtitle: "Vision Pro",
    href: "/visionPro/",
    desc: "A concept visionOS app that returns autonomy to neurodivergent visitors in libraries.\nPowered by AI and local librarian input, Book Focus uses library card history and real-time behavior to deliver one tailored recommendation at a time, reducing cognitive load.",
    slides: [
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-1.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-2.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-3.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-4.jpg` },
      { type: "image", src: `${B}/visionPro/visionPro-StyleFrame-8-apple.jpg` },
    ],
  },
];

/** Secondary links used by the sidebar on project pages. */
export const moreLinks = [
  { href: "/mile10/", title: "Mile 10" },
  { href: "/play/", title: "Play" },
  { href: "/sketches/", title: "Sketches" },
];
