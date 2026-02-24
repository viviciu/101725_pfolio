import './style.css'
import { initNavbar } from './navbar.js'
initNavbar({ showIndex: false })
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))


// Tearsheet preview functionality
// Cover images are defined in coverImages.js — edit that file to change them.
import { coverImages } from "./coverImages.js";

const items = document.querySelectorAll(".tearsheets-list li");
const preview = document.querySelector(".tearsheet-preview");

items.forEach((item) => {
  const link = item.querySelector("a");
  const href = link ? link.getAttribute("href") : null;
  const entry = coverImages[href] || item.getAttribute("data-image");

  item.addEventListener("mouseenter", () => {
    const meta = item.querySelector(".label-meta");
    if (meta) meta.classList.add("visible");
    if (!entry) return;

    // Video entry (e.g. Elysium)
    if (typeof entry === "object" && entry.type === "video") {
      preview.style.backgroundImage = "";
      // Reuse existing video if already created for this source
      let video = preview.querySelector("video");
      if (!video || video.getAttribute("data-src") !== entry.src) {
        preview.innerHTML = "";
        video = document.createElement("video");
        video.src = entry.src;
        video.setAttribute("data-src", entry.src);
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.className = "tearsheet-preview-video";
        preview.appendChild(video);
      }
      video.currentTime = 0;
      video.play();
    } else {
      // Static image entry
      const existingVideo = preview.querySelector("video");
      if (existingVideo) existingVideo.remove();
      preview.style.backgroundImage = `url(${entry})`;
    }

    preview.classList.add("visible");
  });

  item.addEventListener("mouseleave", () => {
    const meta = item.querySelector(".label-meta");
    if (meta) meta.classList.remove("visible");
    preview.classList.remove("visible");
    const video = preview.querySelector("video");
    if (video) {
      video.pause();
    }
  });
});

