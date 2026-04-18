/* =========================================================
   IDEA IDRAULICA - Script
   - Mobile drawer + sub-accordion
   - Desktop dropdown accessibile (click + hover)
   - Lightbox galleria
   - Stat counter animati
   - Reveal on scroll
   - Chiusura menu al click su ancore
   ========================================================= */

(() => {
  "use strict";

  const qs = (sel, ctx = document) => ctx.querySelector(sel);
  const qsa = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* ---------- Year in footer ---------- */
  const yearEl = qs("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile drawer ---------- */
  const hamburger = qs(".hamburger");
  const drawer = qs("#mobile-drawer");
  const overlay = qs(".drawer-overlay");

  const setDrawer = (open) => {
    if (!drawer || !overlay || !hamburger) return;
    drawer.dataset.open = String(open);
    overlay.dataset.open = String(open);
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.setAttribute("aria-label", open ? "Chiudi menu" : "Apri menu");
    document.body.style.overflow = open ? "hidden" : "";
  };

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      const open = drawer.dataset.open !== "true";
      setDrawer(open);
    });
  }

  if (overlay) {
    overlay.addEventListener("click", () => setDrawer(false));
  }

  /* ---------- Drawer sub-accordion ---------- */
  qsa(".sub-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!expanded));
      const target = qs(`#${btn.getAttribute("aria-controls")}`);
      if (target) target.dataset.open = String(!expanded);
    });
  });

  /* ---------- Close drawer when clicking internal link ---------- */
  qsa('.mobile-drawer a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => setDrawer(false));
  });

  /* ---------- Desktop dropdown (click + keyboard) ---------- */
  qsa(".nav-toggle").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = btn.getAttribute("aria-expanded") === "true";
      qsa(".nav-toggle").forEach((b) =>
        b.setAttribute("aria-expanded", "false")
      );
      btn.setAttribute("aria-expanded", String(!expanded));
    });
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Escape") btn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".has-dropdown")) {
      qsa(".nav-toggle").forEach((b) =>
        b.setAttribute("aria-expanded", "false")
      );
    }
  });

  /* ---------- Lightbox galleria ---------- */
  const galleryItems = qsa(".gallery-item");
  const lightbox = qs(".lightbox");

  if (galleryItems.length && lightbox) {
    const lbImg = qs("img", lightbox);
    const lbClose = qs(".lb-close", lightbox);
    const lbPrev = qs(".lb-prev", lightbox);
    const lbNext = qs(".lb-next", lightbox);
    let currentIndex = 0;

    const showAt = (index) => {
      currentIndex = (index + galleryItems.length) % galleryItems.length;
      const a = galleryItems[currentIndex];
      const img = qs("img", a);
      lbImg.src = a.getAttribute("href");
      lbImg.alt = img ? img.alt : "";
    };

    const openLb = (index) => {
      showAt(index);
      lightbox.dataset.open = "true";
      document.body.style.overflow = "hidden";
    };

    const closeLb = () => {
      lightbox.dataset.open = "false";
      document.body.style.overflow = "";
      lbImg.src = "";
    };

    galleryItems.forEach((item, i) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        openLb(i);
      });
    });

    lbClose.addEventListener("click", closeLb);
    lbPrev.addEventListener("click", () => showAt(currentIndex - 1));
    lbNext.addEventListener("click", () => showAt(currentIndex + 1));

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLb();
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.dataset.open !== "true") return;
      if (e.key === "Escape") closeLb();
      if (e.key === "ArrowLeft") showAt(currentIndex - 1);
      if (e.key === "ArrowRight") showAt(currentIndex + 1);
    });
  }

  /* ---------- Stat counters ---------- */
  const counters = qsa(".stat-value[data-count]");
  const animateCounter = (el) => {
    const raw = el.dataset.count;
    const target = parseInt(String(raw).replace(/[^0-9]/g, ""), 10);
    if (!Number.isFinite(target) || target <= 0) return;
    const suffix = el.textContent.includes("+") ? "+" : "";
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Intersection Observer: reveal + counters ---------- */
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    qsa(".reveal").forEach((el) => io.observe(el));

    const cIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target);
          cIo.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => cIo.observe(el));
  } else {
    qsa(".reveal").forEach((el) => el.classList.add("is-visible"));
  }
})();
