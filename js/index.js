// Footer copyright
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

requestAnimationFrame(() => {
  document.body.classList.add("is-loaded");
});

document
  .querySelectorAll('a[href$=".html"], a[href*=".html#"]')
  .forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      const currentPage =
        window.location.pathname.split("/").pop() || "index.html";
      const [hrefPage] = href.split("#");

      if (hrefPage === currentPage) return;

      if (link.target === "_blank" || e.metaKey || e.ctrlKey) return;

      e.preventDefault();
      if (prefersReducedMotion) {
        window.location.href = href;
        return;
      }
      document.body.classList.remove("is-loaded");
      document.body.classList.add("is-transitioning");
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    });
  });
// Nav for Mobile
const navToggle = document.getElementById("navToggle");
const primaryNav = document.getElementById("primaryNav");

if (navToggle && primaryNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("isOpen");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Fading the images
document
  .querySelectorAll(".hero-photo img, .about-photo img, .project-thumb img")
  .forEach((img) => {
    if (img.complete) {
      img.classList.add("is-loaded");
    } else {
      img.addEventListener("load", () => img.classList.add("is-loaded"));
    }
  });

// Scramble
