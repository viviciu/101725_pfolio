import './style.css'
import { initNavbar } from './navbar.js'
import { initLazyVideos } from './lazyVideos.js'
initNavbar({ showIndex: false })

const playLink = document.createElement("a");
playLink.href = "/play/";
playLink.className = "site-nav-link font-ABCDiatypeReg";
playLink.textContent = "play";
const infoBtn = document.getElementById("info-btn");
infoBtn.before(playLink);

import { coverImages } from "./coverImages.js";

const isMobile = /Mobi|Android/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);

if (!isMobile) {
  Object.values(coverImages).forEach((entry) => {
    if (typeof entry === "object" && entry.type === "video") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "video";
      link.href = entry.src;
      document.head.appendChild(link);
    } else if (typeof entry === "string") {
      new Image().src = entry;
    }
  });
}

/* ── List-view hover previews ── */

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

    if (typeof entry === "object" && entry.type === "video") {
      preview.style.backgroundImage = "";
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

/* ── Grid view builder ── */

const gridView = document.getElementById("grid-view");
const listView = document.getElementById("list-view");

function buildGrid() {
  if (gridView.querySelector(".grid-view-inner")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "grid-view-inner";

  items.forEach((item) => {
    const link = item.querySelector("a");
    if (!link) return;
    const href = link.getAttribute("href");
    const title = link.textContent.trim();
    const metaEl = item.querySelector(".label-meta");
    const meta = metaEl ? metaEl.textContent.trim() : "";
    const entry = coverImages[href];

    const card = document.createElement("a");
    card.href = href;
    card.className = "grid-card";
    if (link.classList.contains("pointer-events-none")) {
      card.style.pointerEvents = "none";
    }

    const mediaWrap = document.createElement("div");
    mediaWrap.className = "grid-card-media";
    if (href === "/mile10/") mediaWrap.classList.add("contain-half");

    if (entry && typeof entry === "object" && entry.type === "video") {
      const video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "none";
      const source = document.createElement("source");
      source.setAttribute("data-src", entry.src);
      video.appendChild(source);
      if (!isMobile) {
        card.addEventListener("mouseenter", () => {
          if (!source.src) { source.src = source.getAttribute("data-src"); video.load(); }
          video.play();
        });
        card.addEventListener("mouseleave", () => { video.pause(); video.currentTime = 0; });
      }
      mediaWrap.appendChild(video);
    } else if (entry && typeof entry === "string") {
      const img = document.createElement("img");
      img.src = entry;
      img.alt = title;
      img.loading = "eager";
      mediaWrap.appendChild(img);
    }

    const info = document.createElement("div");
    info.className = "grid-card-info";

    const titleEl = document.createElement("p");
    titleEl.className = "grid-card-title";
    titleEl.textContent = title;

    const metaTag = document.createElement("p");
    metaTag.className = "grid-card-meta";
    metaTag.textContent = meta;

    info.appendChild(titleEl);
    if (meta) info.appendChild(metaTag);

    card.appendChild(mediaWrap);
    card.appendChild(info);
    wrapper.appendChild(card);
  });

  gridView.appendChild(wrapper);
}

buildGrid();
initLazyVideos();

/* ── Toggle logic ── */

const toggleBtns = document.querySelectorAll(".view-toggle-btn");

toggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    toggleBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (view === "grid") {
      listView.classList.remove("active");
      gridView.classList.add("active");
      buildGrid();
      playLink.style.display = "";
    } else {
      gridView.classList.remove("active");
      listView.classList.add("active");
      playLink.style.display = "none";
    }
  });
});

