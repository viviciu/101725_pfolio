/**
 * Shared navbar — imported on every page except the landing page.
 * Injects a fixed top nav with "index" link and "info" button
 * that toggles a full-screen about overlay.
 */
export function initNavbar() {
  /* ── nav bar ── */
  const nav = document.createElement("nav");
  nav.className = "site-nav";
  nav.innerHTML = `
    <a href="/" class="site-nav-link font-ABCDiatypeReg">index</a>
    <button id="info-btn" class="site-nav-link font-ABCDiatypeReg" type="button">info</button>
  `;
  document.body.prepend(nav);

  /* ── about overlay ── */
  const overlay = document.createElement("div");
  overlay.id = "about-overlay";
  overlay.className =
    "fixed inset-0 z-50 pointer-events-none transition-opacity duration-[420ms] ease-[cubic-bezier(.78,-0.01,.17,.99)] backdrop-blur-[60px] opacity-0";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
    <!-- semi-opaque layer + backdrop blur -->
    <div class="absolute inset-0 bg-white/20" id="about-backdrop"></div>

    <!-- centered content -->
    <div class="font-ABCDiatypeReg text-black grid grid-cols-6 grid-rows-5 text-sm gap-[15px] mx-[32px] my-[13px] relative z-10" id="about-content">

      

      <!-- bio -->
      <div class="col-start-1 col-span-3 row-span-1 text-sm">
I'm a a multidisciplinary designer studying Industrial Design and HCI at Carnegie Mellon University. I've been into image-making for a pretty long time, and my fascination with light lead me to love visualization and CGI. In ID, I'm interested in subjects around calm technology, and everyday carry items that make life just a little more delightful.
<br /><br />
I enjoy learning new processes that force me to think differently, which has lead me to become a chronic side quester:
I've worked on websites, directed a spectulative app promotion film, and worked at an AI startup aiming to spark more authentic human connection.
<br /><br />
I come from Baltimore > now based in Pittsburgh.
      </div>

      <!-- experience -->
      <div class="col-start-3 row-start-3 col-span-4 row-span-4 text-sm">
        <!-- Gentle Systems -->
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-2">
            <div>Designer @ Gentle Systems</div>
            <div>2026—Present</div>
          </div>
          <div class="col-span-2">
            3D Visualization &amp; Industrial Design concepting.
          </div>
        </div>
        <!-- Lunar Gala Motion -->
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-2">
            <div>3D Motion Designer @ Lunar Gala</div>
            <div>2025—Present</div>
          </div>
          <div class="col-span-2">
            Designing backdrop motion for Pittsburgh's largest final show.
          </div>
        </div>
        <!-- Augmented Perception Lab -->
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-2">
            <div>Industrial Designer @ Augmented Perception Lab</div>
            <div>2025—2025</div>
          </div>
          <div class="col-span-2">
            Spent a semester prototyping a device which helps those in distributed teams feel more connected.
          </div>
        </div>
        <!-- Lunar Gala Web -->
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-2">
            <div>Web Design Lead @ Lunar Gala</div>
            <div>2024—2025</div>
          </div>
          <div class="col-span-2">
            Designed and developed flexible interactive GLSL particle system
            while leading a team of 9.
          </div>
        </div>
        <!-- Spatial Experiences Lab -->
        <div class="grid grid-cols-4 grid-rows-2">
          <div class="col-span-2">
            <div>Motion Designer @ Spatial Experiences Lab, CMU SoD</div>
            <div>2025—2025</div>
          </div>
          <div class="col-span-2">
            Produced static and animated visualizations to illustrate spatial
            interaction frameworks for an MR paper.
          </div>
        </div>
      </div>

      <!-- contact -->
      <div class="col-start-1 row-start-3 text-sm font-ABCDiatypeReg">
        vstaicu@andrew.cmu.edu
        <br />
        <a class="" href="https://www.linkedin.com/in/viviana-staicu-633aa2223/" target="_blank" rel="noopener noreferrer">Linkedin</a>
        <br />
        <a class="" href="/public/vivianaStaicu_CV.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
      </div>

    </div>
  `;
  document.body.appendChild(overlay);

  /* ── toggle logic ── */
  const infoBtn  = document.getElementById("info-btn");


  // add a quick fade transition to the navbar itself
  nav.classList.add("transition-opacity", "duration-300");

  function openAbout() {
    overlay.classList.remove("opacity-0", "pointer-events-none");
    overlay.classList.add("opacity-100", "pointer-events-auto");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    // fade navbar out
    nav.classList.add("opacity-0", "pointer-events-none");
  }

  function closeAbout() {
    overlay.classList.remove("opacity-100", "pointer-events-auto");
    overlay.classList.add("opacity-0", "pointer-events-none");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    // fade navbar back in
    nav.classList.remove("opacity-0", "pointer-events-none");
  }

  infoBtn.addEventListener("click", openAbout);


  // track mousedown so we can distinguish a click from a drag-to-select
  let downX = 0;
  let downY = 0;
  overlay.addEventListener("mousedown", (e) => { downX = e.clientX; downY = e.clientY; });

  // clicking anywhere on the overlay closes it — UNLESS:
  //  • the click is on a link
  //  • the mouse moved (user was selecting text)
  overlay.addEventListener("click", (e) => {
    const dx = Math.abs(e.clientX - downX);
    const dy = Math.abs(e.clientY - downY);
    if (dx > 5 || dy > 5) return;         // dragged — ignore
    if (e.target.closest("a")) return;     // let links do their thing
    closeAbout();
  });

  // close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("opacity-100")) {
      closeAbout();
    }
  });
}

initNavbar();
