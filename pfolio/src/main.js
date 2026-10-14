import './style.css'
import { projects } from './landingProjects.js'

const stage = document.getElementById("lp-stage");
const nav = document.getElementById("lp-nav");
const progress = document.getElementById("lp-progress");
const desc = document.getElementById("lp-desc");

let current = -1;

/* ── Stage: one media element per project, stacked; only the open one is visible ── */

const mediaEls = projects.map((p) => {
  const s = p.slides[0];
  const el = document.createElement(s.type === "video" ? "video" : "img");
  el.className = `lp-media ${p.frame || "center"}`;
  el.dataset.src = s.src;           // real source is set the first time the project opens
  if (s.type === "video") {
    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.preload = "none";
  } else {
    el.alt = `${p.title} — ${p.subtitle}`;
    el.decoding = "async";
  }
  el.draggable = false;
  stage.appendChild(el);
  return el;
});

function loadMedia(i) {
  const el = mediaEls[i];
  if (el && el.dataset.src) {
    el.src = el.dataset.src;
    el.removeAttribute("data-src");
    if (el.tagName === "VIDEO") el.load();
  }
}

/* ── Nav: one fixed row. Every project is a number; the open one swaps its number
      for "title + subtitle" in place (and the numbers after it shift right). ── */

function numberButton(i) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "lp-num";
  b.textContent = i + 1;
  b.setAttribute("aria-label", `Open project ${i + 1}: ${projects[i].title}`);
  b.addEventListener("click", () => show(i));
  return b;
}

function openBlock(i) {
  const p = projects[i];
  const open = document.createElement(p.href ? "a" : "span");
  open.className = "lp-open";
  if (p.href) {
    open.href = p.href;
    open.setAttribute("aria-label", `View project: ${p.title}`);
  }
  open.innerHTML = `<span class="lp-title"></span><span class="lp-sub"></span>`;
  open.querySelector(".lp-title").textContent = p.title;
  open.querySelector(".lp-sub").textContent = p.subtitle;
  return open;
}

function renderNav() {
  nav.replaceChildren(...projects.map((_, i) => (i === current ? openBlock(i) : numberButton(i))));
}

/* ── Progress bracket: [ - - - - - - ], the open project's dash is dark ── */

function renderProgress() {
  progress.innerHTML =
    "<span>[</span><span class=\"lp-dashes\">" +
    projects.map((_, i) => `<span class="${i === current ? "on" : ""}">-</span>`).join("") +
    "</span><span>]</span>";
}

/* ── Open a project (closes the previous one) ── */

function show(i) {
  const n = projects.length;
  i = ((i % n) + n) % n;            // wraps: after the last comes the first
  if (i === current) return;

  const prev = current;
  current = i;

  if (prev >= 0) {
    mediaEls[prev].classList.remove("active");
    if (mediaEls[prev].tagName === "VIDEO") mediaEls[prev].pause();
  }
  loadMedia(i);
  const el = mediaEls[i];
  el.classList.add("active");
  if (el.tagName === "VIDEO") el.play().catch(() => {});

  document.body.dataset.theme = projects[i].theme || "light";
  desc.textContent = projects[i].desc;
  renderNav();
  renderProgress();
  history.replaceState(null, "", `#${i + 1}`);

  // warm up the neighbours' images so the next click feels instant
  [i - 1, i + 1].forEach((k) => {
    const nb = mediaEls[(k + n) % n];
    if (nb.tagName === "IMG") loadMedia((k + n) % n);
  });
}

/* ── Click right half = next, left half = previous; cursor shows which ── */

stage.addEventListener("mousemove", (e) => {
  const left = e.clientX < window.innerWidth / 2;
  stage.classList.toggle("is-left", left);
  stage.classList.toggle("is-right", !left);
});
stage.addEventListener("click", (e) => {
  show(e.clientX < window.innerWidth / 2 ? current - 1 : current + 1);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") show(current + 1);
  if (e.key === "ArrowLeft") show(current - 1);
});

/* ── Start on the project in the URL hash (#3 = third), else the first ── */

const fromHash = parseInt(location.hash.slice(1), 10);
show(Number.isInteger(fromHash) && fromHash >= 1 && fromHash <= projects.length ? fromHash - 1 : 0);
