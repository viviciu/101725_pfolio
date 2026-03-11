const isMobile = /Mobi|Android/i.test(navigator.userAgent) ||
  (navigator.maxTouchPoints > 0 && window.innerWidth < 1024);

const MAX_LOADED = isMobile ? 2 : 6;

const loaded = new Set();

function unloadVideo(video) {
  video.pause();
  const source = video.querySelector("source");
  if (source) {
    source.setAttribute("data-src", source.src);
    source.removeAttribute("src");
  } else if (video.src) {
    video.setAttribute("data-src", video.src);
    video.removeAttribute("src");
  }
  video.load();
  loaded.delete(video);
}

function loadVideo(video) {
  const source = video.querySelector("source");
  const dataSrc = source
    ? source.getAttribute("data-src")
    : video.getAttribute("data-src");

  if (!dataSrc) return;

  if (source) {
    source.src = dataSrc;
    source.removeAttribute("data-src");
  } else {
    video.src = dataSrc;
    video.removeAttribute("data-src");
  }
  video.load();
  loaded.add(video);

  if (loaded.size > MAX_LOADED) {
    for (const v of loaded) {
      if (v !== video && !isInViewport(v)) {
        unloadVideo(v);
        break;
      }
    }
  }
}

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        loadVideo(video);
        video.play().catch(() => {});
      } else {
        video.pause();
        if (isMobile) unloadVideo(video);
      }
    });
  },
  { rootMargin: "200px 0px" }
);

/**
 * Call once after the DOM (or dynamic content) is ready.
 * Converts all <video> elements to lazy-loaded:
 * moves src to data-src and observes them.
 */
export function initLazyVideos(root = document) {
  const videos = root.querySelectorAll("video");

  videos.forEach((video) => {
    if (video.closest("#modal, #modal-content")) return;
    if (video.dataset.lazyInit) return;
    video.dataset.lazyInit = "1";

    video.removeAttribute("autoplay");
    video.setAttribute("preload", "none");

    const source = video.querySelector("source");
    if (source && source.src && !source.getAttribute("data-src")) {
      source.setAttribute("data-src", source.src);
      source.removeAttribute("src");
    } else if (video.src && !video.getAttribute("data-src")) {
      video.setAttribute("data-src", video.src);
      video.removeAttribute("src");
    }

    observer.observe(video);
  });
}
