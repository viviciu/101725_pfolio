import "./style.css";
import { initNavbar } from "./navbar.js";
import { initLazyVideos } from "./lazyVideos.js";
initNavbar();
import { c4dItems } from "./c4dItems.js";

const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

let currentIndex = 0;
const items = c4dItems;

/* =============================================
   RENDER GRID
   ============================================= */

function renderGrid() {
  grid.innerHTML = items
    .map((item, index) => {
      const media =
        item.fileType === "webp"
          ? `<img
              src="${item.url}"
              alt="${item.id}"
              width="500" height="500"
              loading="lazy" decoding="async"
              class="w-full h-full object-cover translate-y-0 transition group-hover:translate-y-2 cursor-pointer"
            />`
          : `<video
              class="w-full h-full object-cover translate-y-0 transition group-hover:translate-y-2 cursor-pointer"
              width="500" height="500"
              loop muted playsinline preload="none"
            >
              <source data-src="${item.url}" type="video/${item.fileType}" />
            </video>`;

      return `
        <div class="item" data-index="${index}">
          <div class="justify-center relative group text-cap">
            ${media}
          </div>
        </div>`;
    })
    .join("");
}

/* =============================================
   MODAL
   ============================================= */

function openModal(index) {
  currentIndex = index;
  const item = items[index];

  let media;
  if (item.fileType === "webp") {
    media = `<img
      src="${item.url}"
      alt="${item.id}"
      class="max-h-[84vh]"
      id="modal-media"
    />`;
  } else {
    media = `<video
      class="max-h-[84vh]"
      autoplay loop muted playsinline
      id="modal-media"
    >
      <source src="${item.url}" type="video/${item.fileType}" />
    </video>`;
  }

  modalContent.innerHTML = media;
  modal.classList.remove("hidden");
  modal.classList.add("flex");

  const el = document.getElementById("modal-media");

  el.addEventListener("mousemove", (e) => {
    const half = el.clientWidth / 2;
    const x = e.clientX - el.getBoundingClientRect().left;
    el.style.setProperty("cursor", x > half ? "e-resize" : "w-resize", "important");
  });

  el.addEventListener("click", (e) => {
    e.stopPropagation();
    const half = el.clientWidth / 2;
    const x = e.clientX - el.getBoundingClientRect().left;
    if (x > half) {
      openModal((currentIndex + 1) % items.length);
    } else {
      openModal((currentIndex - 1 + items.length) % items.length);
    }
  });
}

function closeModal() {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  modalContent.innerHTML = "";
}

/* =============================================
   EVENT LISTENERS
   ============================================= */

grid.addEventListener("click", (e) => {
  const itemEl = e.target.closest(".item[data-index]");
  if (!itemEl) return;
  const index = Number(itemEl.dataset.index);
  openModal(index);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("flex")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") openModal((currentIndex + 1) % items.length);
  if (e.key === "ArrowLeft") openModal((currentIndex - 1 + items.length) % items.length);
});

/* =============================================
   INIT
   ============================================= */

renderGrid();
initLazyVideos();
