import "./style.css";
import { initNavbar } from "./navbar.js";
initNavbar();
import { items } from "./items.js";

const grid = document.getElementById("grid");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const filters = document.getElementById("filters");

let selectedCategory = null;
let currentIndex = 0;
let filteredItems = [...items];

/* =============================================
   RENDER GRID
   ============================================= */

function renderGrid() {
  filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : [...items];

  grid.innerHTML = filteredItems
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
              autoplay loop muted playsinline
            >
              <source src="${item.url}" type="video/${item.fileType}" />
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
  const item = filteredItems[index];

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

  // Attach left/right click navigation to the media element
  const el = document.getElementById("modal-media");
  el.style.cursor = "e-resize";

  el.addEventListener("mousemove", (e) => {
    const half = el.clientWidth / 2;
    const x = e.clientX - el.getBoundingClientRect().left;
    el.style.cursor = x > half ? "e-resize" : "w-resize";
  });

  el.addEventListener("click", (e) => {
    e.stopPropagation();
    const half = el.clientWidth / 2;
    const x = e.clientX - el.getBoundingClientRect().left;
    if (x > half) {
      openModal((currentIndex + 1) % filteredItems.length);
    } else {
      openModal((currentIndex - 1 + filteredItems.length) % filteredItems.length);
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

// Filter clicks
filters.addEventListener("click", (e) => {
  const label = e.target.closest("label[data-category]");
  if (!label) return;

  const category = label.dataset.category || null;
  selectedCategory = category;

  // Update clicked class on labels
  filters.querySelectorAll("label").forEach((l) => l.classList.remove("clicked"));
  label.classList.add("clicked");

  renderGrid();
});

// Grid clicks → open modal (or navigate if the item has a link)
grid.addEventListener("click", (e) => {
  const itemEl = e.target.closest(".item[data-index]");
  if (!itemEl) return;
  const index = Number(itemEl.dataset.index);
  const item = filteredItems[index];
  if (item.link) {
    window.location.href = item.link;
    return;
  }
  openModal(index);
});

// Modal backdrop click → close
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Keyboard: Escape closes, arrows navigate
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("flex")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") openModal((currentIndex + 1) % filteredItems.length);
  if (e.key === "ArrowLeft") openModal((currentIndex - 1 + filteredItems.length) % filteredItems.length);
});

/* =============================================
   INIT
   ============================================= */

renderGrid();
