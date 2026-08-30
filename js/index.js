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
    navToggle.setAttribute("aria-expanded", String("is-Open"));
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

// Scroll-reveal
const revealEls = document.querySelectorAll(".reveal");
if (revealEls.length) {
  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => io.observe(el));
  }
}

//scroll progress bar
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
const parallaxImg = document.querySelector(".hero-photo img");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

  if (scrollProgress) {
    scrollProgress.style.width = pct + "%";
  }
  if (backToTop) {
    backToTop.classList.toggle("is-visible", scrollTop > 400);
  }
  if (parallaxImg && !prefersReducedMotion) {
    const offset = Math.max(-14, Math.min(14, scrollTop * 0.06));
    parallaxImg.style.transform = `scale(1.03) translateY(${offset}px)`;
  }
}

if (scrollProgress || backToTop || parallaxImg) {
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Scramble
function scrambleReveal(el, duration = 900) {
  const original = el.textContent.trim();
  el.setAttribute("aria-label", original);

  if (prefersReducedMotion) return;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const length = original.length;
  const start = performance.now();

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const revealCount = Math.floor(progress * length);
    let out = "";
    for (let i = 0; i < length; i++) {
      const ch = original[i];
      out +=
        ch === " " || i < revealCount
          ? ch
          : chars[Math.floor(Math.random() * chars.length)];
    }
    el.textContent = out;
    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = original;
    }
  }
  requestAnimationFrame(frame);
}
document.querySelectorAll(".scramble").forEach((el) => scrambleReveal(el));
