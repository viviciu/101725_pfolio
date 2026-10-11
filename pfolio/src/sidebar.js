/**
 * Persistent sidebar — name (top-left) + "Selected works" list.
 * Injected on every page by initNavbar(), so it stays on screen everywhere,
 * including inside a project. On the landing page, clicking a work scrolls to
 * its strip; on any other page it navigates.
 *
 * MARKUP is the template below. PLACEMENT + SIZE live in style.css under
 * "SIDEBAR" (look for the CSS variables in :root there).
 */
import { projects, moreLinks } from "./landingProjects.js";

export function initSidebar() {
  const path = location.pathname.replace(/index\.html$/, "");
  const isLanding = path === "/" || path === "";

  const side = document.createElement("aside");
  side.className = "site-sidebar font-ABCDiatypeReg";
  side.innerHTML = `
    <!-- NAME: top-left, column 1 of the sidebar -->
    <a href="/" class="site-sidebar-name">Viviana Staicu</a>

    <!-- SELECTED WORKS: column 2 of the sidebar, bottom-aligned -->
    <nav class="site-sidebar-list" aria-label="Selected works">
      <p class="site-sidebar-head">Selected works</p>
      ${projects
        .map(
          (p, i) =>
            `<a href="${p.href}" data-index="${i}" class="site-sidebar-item${
              path === p.href ? " active" : ""
            }">${p.title}</a>`
        )
        .join("")}
      <div class="site-sidebar-more">
        ${moreLinks
          .map(
            (l) =>
              `<a href="${l.href}"${path === l.href ? ' class="active"' : ""}>${l.title}</a>`
          )
          .join("")}
      </div>
    </nav>
  `;
  document.body.prepend(side);
  document.body.classList.add("has-sidebar");

  if (isLanding) {
    side.querySelectorAll(".site-sidebar-item").forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = document.getElementById(`strip-${a.dataset.index}`);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
}

/** Landing page only: highlight the work whose strip is on screen. */
export function trackActiveStrip() {
  const items = [...document.querySelectorAll(".site-sidebar-item")];
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        const idx = Number(target.id.replace("strip-", ""));
        items.forEach((el, k) => el.classList.toggle("active", k === idx));
      });
    },
    { rootMargin: "-40% 0px -50% 0px" }
  );
  document.querySelectorAll(".strip-figure").forEach((f) => io.observe(f));
}
