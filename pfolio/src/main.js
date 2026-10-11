import './style.css'
import { initNavbar } from './navbar.js'
import { projects } from './landingProjects.js'
import { trackActiveStrip } from './sidebar.js'
initNavbar({ showIndex: false })

const strips = document.getElementById("landing-strips");

/* ── Project strips ── */

projects.forEach((p, i) => {
  const figure = document.createElement("figure");
  figure.className = "strip-figure";
  figure.id = `strip-${i}`;

  const strip = document.createElement("a");
  strip.href = p.href;
  strip.className = "strip";
  strip.setAttribute("aria-label", `Open ${p.title}`);

  p.slides.forEach((s, j) => {
    const slide = document.createElement("div");
    slide.className = "strip-slide";
    if (s.type === "video") {
      const v = document.createElement("video");
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.preload = "none";
      v.dataset.src = s.src;
      v.draggable = false;
      slide.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.src = s.src;
      img.alt = `${p.title} ${j + 1}`;
      img.draggable = false;
      img.loading = i === 0 && j === 0 ? "eager" : "lazy";
      img.decoding = "async";
      slide.appendChild(img);
    }
    strip.appendChild(slide);
  });

  const caption = document.createElement("figcaption");
  caption.className = "strip-label font-ABCDiatypeReg";
  caption.textContent = p.title;

  figure.appendChild(strip);
  figure.appendChild(caption);
  strips.appendChild(figure);

  /* Mouse drag-to-scroll; a drag must not count as a click into the project. */
  let down = false, startX = 0, startLeft = 0, moved = false;
  strip.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") return;
    down = true; moved = false;
    startX = e.clientX; startLeft = strip.scrollLeft;
    strip.classList.add("dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (!down) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 5) moved = true;
    if (moved) strip.scrollLeft = startLeft - dx;
  });
  window.addEventListener("pointerup", () => {
    if (!down) return;
    down = false;
    strip.classList.remove("dragging");
  });
  strip.addEventListener("click", (e) => { if (moved) { e.preventDefault(); moved = false; } });
});

/* ── Videos: load + play only when visible inside their strip ── */

const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target: v, isIntersecting }) => {
    if (isIntersecting) {
      if (v.dataset.src) { v.src = v.dataset.src; v.removeAttribute("data-src"); v.load(); }
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll(".strip-slide video").forEach((v) => videoObserver.observe(v));

trackActiveStrip();
