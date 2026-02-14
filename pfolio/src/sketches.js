import "./style.css";
import { initNavbar } from "./navbar.js";
initNavbar();
import { sketchbookItems } from "./sketchbookItems.js";

const grid = document.getElementById("sketchbook-grid");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");

let currentIndex = 0;

/* =============================================
   RENDER GRID
   ============================================= */

function renderGrid() {
  grid.innerHTML = sketchbookItems
    .map((item, index) => {
      return `
        <div class="item" data-index="${index}">
          <div class="justify-center relative group text-cap pt-[0.5rem] break-inside-avoid">
            <img
              src="${item.url}"
              alt="${item.name || item.id}"
              width="500" height="500"
              loading="lazy" decoding="async"
              class="h-full object-cover translate-y-0 transition group-hover:translate-y-2 cursor-pointer"
            />
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
  const item = sketchbookItems[index];

  modalContent.innerHTML = `<img
    src="${item.url}"
    alt="${item.name || item.id}"
    class="max-h-[84vh]"
    id="modal-media"
    style="cursor: e-resize;"
  />`;

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  // Left/right cursor + click navigation
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
      openModal((currentIndex + 1) % sketchbookItems.length);
    } else {
      openModal((currentIndex - 1 + sketchbookItems.length) % sketchbookItems.length);
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

// Grid clicks → open modal
grid.addEventListener("click", (e) => {
  const itemEl = e.target.closest(".item[data-index]");
  if (!itemEl) return;
  openModal(Number(itemEl.dataset.index));
});

// Modal backdrop click → close
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard: Escape closes, arrows navigate
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("flex")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight")
    openModal((currentIndex + 1) % sketchbookItems.length);
  if (e.key === "ArrowLeft")
    openModal(
      (currentIndex - 1 + sketchbookItems.length) % sketchbookItems.length
    );
});

/* =============================================
   INIT
   ============================================= */

renderGrid();
