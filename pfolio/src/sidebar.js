/**
 * Persistent sidebar — name (top-left) + "Selected works" list.
 * Injected on every project page by initNavbar(), so it stays on screen
 * while you are inside a project. (The landing page has its own layout.)
 *
 * MARKUP is the template below. PLACEMENT + SIZE live in style.css under
 * "SIDEBAR" (look for the CSS variables in :root there).
 */
import { projects, moreLinks } from "./landingProjects.js";

export function initSidebar() {
  const path = location.pathname.replace(/index\.html$/, "");

  const side = document.createElement("aside");
  side.className = "site-sidebar font-ABCDiatypeReg";
  side.innerHTML = `
    <!-- TOP-LEFT STACK (column 1), top to bottom: name → nav links (index / info) → selected works.
         navbar.js drops the nav links into #site-nav-slot. -->
    <div class="site-sidebar-top">
      <a href="/" class="site-sidebar-name">Viviana Staicu</a>
      <div id="site-nav-slot"></div>

    <!-- SELECTED WORKS -->
    <nav class="site-sidebar-list" aria-label="Selected works">
      <p class="site-sidebar-head">Selected works</p>
      ${projects
        .filter((p) => p.href)
        .map(
          (p) =>
            `<a href="${p.href}" class="site-sidebar-item${
              path === p.href ? " active" : ""
            }">${p.title} • ${p.subtitle}</a>`
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
    </div>
  `;
  document.body.prepend(side);
  document.body.classList.add("has-sidebar");

  return side;
}
