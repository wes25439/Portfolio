// ========== TEXT ANIMATION ==========
const words = [
  "Full-Stack Developer",
  "Support specialist",
  "Final Year Expert",
  "Web Designer",
  "Systems developer",
  "Coding Educator"
];

let wordIndex = 0;
let letterIndex = 0;
const spanElement = document.querySelector(".text-animation span");

function typeText() {
  if (!spanElement) return;
  if (letterIndex < words[wordIndex].length) {
    spanElement.textContent += words[wordIndex][letterIndex];
    letterIndex++;
    setTimeout(typeText, 120);
  } else {
    setTimeout(eraseText, 2200);
  }
}

function eraseText() {
  if (!spanElement) return;
  if (letterIndex > 0) {
    spanElement.textContent = words[wordIndex].substring(0, letterIndex - 1);
    letterIndex--;
    setTimeout(eraseText, 70);
  } else {
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeText, 400);
  }
}

if (spanElement) {
  typeText();
}

// ========== MAIN DOM READY ==========
document.addEventListener("DOMContentLoaded", function () {
  // Year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ========== SKILL BARS ==========
  function animateSkillBars() {
    const skillBars = document.querySelectorAll(".skill-progress");
    skillBars.forEach((bar) => {
      const targetWidth = parseInt(bar.getAttribute("data-width"), 10);
      const percentageElement = bar.parentElement.previousElementSibling.querySelector(".skill-percentage");
      let currentWidth = 0;
      const increment = targetWidth / 40;
      const interval = setInterval(() => {
        currentWidth += increment;
        if (currentWidth >= targetWidth) {
          currentWidth = targetWidth;
          clearInterval(interval);
        }
        bar.style.width = currentWidth + "%";
        if (percentageElement) {
          percentageElement.textContent = Math.round(currentWidth) + "%";
        }
      }, 25);
    });
  }

  const skillsSection = document.querySelector(".about");
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(skillsSection);
  }

  // ========== MOBILE MENU ==========
  const menuIcon = document.getElementById("menu-icon");
  const navbar = document.querySelector(".navbar");

  function closeMenu() {
    if (navbar && menuIcon) {
      navbar.classList.remove("show");
      menuIcon.classList.remove("bx-x");
      menuIcon.classList.add("bx-menu");
    }
  }

  function openMenu() {
    if (navbar && menuIcon) {
      navbar.classList.add("show");
      menuIcon.classList.remove("bx-menu");
      menuIcon.classList.add("bx-x");
    }
  }

  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navbar.classList.contains("show")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when any nav link is clicked
    navbar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    const drops = navbar.querySelectorAll(".nav-drop");
    drops.forEach((drop) => {
      const dropBtn = drop.querySelector(".nav-drop-btn");
      if (!dropBtn) return;
      dropBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        drops.forEach((other) => {
          if (other !== drop) {
            other.classList.remove("open");
            other.querySelector(".nav-drop-btn")?.setAttribute("aria-expanded", "false");
          }
        });
        const open = drop.classList.toggle("open");
        dropBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    document.addEventListener("click", (e) => {
      if (window.innerWidth <= 1200) return;
      if (!e.target.closest(".nav-drop")) {
        drops.forEach((drop) => {
          drop.classList.remove("open");
          drop.querySelector(".nav-drop-btn")?.setAttribute("aria-expanded", "false");
        });
      }
    });

    // Close when clicking outside the menu
    document.addEventListener("click", (e) => {
      if (
        navbar.classList.contains("show") &&
        !navbar.contains(e.target) &&
        !menuIcon.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (window.innerWidth > 1200 && navbar && navbar.classList.contains("show")) {
      closeMenu();
    }
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMenu();
      }
    });
  });

  // ========== CIRCLE POPUPS (touch + hover) ==========
  const analyticCircles = document.querySelectorAll(".analytic-circle");
  analyticCircles.forEach((circle) => {
    circle.addEventListener("touchstart", function (e) {
      e.stopPropagation();
      analyticCircles.forEach((c) => {
        if (c !== circle) c.querySelector(".circle-popup")?.classList.remove("show");
      });
      this.querySelector(".circle-popup")?.classList.toggle("show");
    });

    circle.addEventListener("mouseenter", function () {
      this.querySelector(".circle-popup")?.classList.add("show");
    });
    circle.addEventListener("mouseleave", function () {
      this.querySelector(".circle-popup")?.classList.remove("show");
    });
  });

  document.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".analytic-circle")) {
      document.querySelectorAll(".circle-popup.show").forEach((p) => p.classList.remove("show"));
    }
  }, { passive: true });

  // ========== CONTACT FORM → WHATSAPP ==========
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const fullName = contactForm.querySelector('input[placeholder="Full Name"]').value.trim();
      const email = contactForm.querySelector('input[placeholder="Email"]').value.trim();
      const phone = contactForm.querySelector('input[placeholder="Phone Number"]').value.trim();
      const subject = contactForm.querySelector('input[placeholder="Subject"]').value.trim();
      const message = contactForm.querySelector("textarea").value.trim();

      const phoneNumber = "254708808854";
      const whatsappMessage =
        `🌟 *NEW MESSAGE FROM CODEWITHWES* 🌟%0A%0A` +
        `👤 *Name:* ${encodeURIComponent(fullName)}%0A` +
        `📧 *Email:* ${encodeURIComponent(email)}%0A` +
        `📱 *Phone:* ${encodeURIComponent(phone)}%0A` +
        `📌 *Subject:* ${encodeURIComponent(subject)}%0A%0A` +
        `💬 *Message:*%0A${encodeURIComponent(message)}%0A%0A` +
        `---%0ASent via codewithwes.co.ke`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

      const submitBtn = contactForm.querySelector('input[type="submit"]');
      const originalText = submitBtn.value;
      submitBtn.value = "Opening WhatsApp...";
      submitBtn.disabled = true;

      window.open(whatsappUrl, "_blank");

      setTimeout(() => {
        contactForm.reset();
        submitBtn.value = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ========== ADVANCED PROJECTS CATALOG ==========
  const grid = document.getElementById("projects-grid");
  if (grid) {
    const cards = Array.from(grid.querySelectorAll(".adv-card"));
    const searchInput = document.getElementById("project-search");
    const categorySelect = document.getElementById("category-filter");
    const loadMoreBtn = document.getElementById("load-more");
    const emptyState = document.getElementById("empty-state");
    const resetBtn = document.getElementById("reset-filters");
    const resultsCount = document.getElementById("results-count");
    const INITIAL_VISIBLE = 6;
    let visibleLimit = INITIAL_VISIBLE;

    function isFiltering() {
      const q = (searchInput?.value || "").trim();
      const cat = categorySelect?.value || "all";
      return q.length > 0 || cat !== "all";
    }

    function cardMatches(card) {
      const q = (searchInput?.value || "").trim().toLowerCase();
      const cat = categorySelect?.value || "all";
      const hay = [
        card.dataset.title || "",
        card.dataset.category || "",
        card.dataset.tech || "",
        card.textContent || ""
      ].join(" ").toLowerCase();

      const catOk = cat === "all" || card.dataset.category === cat;
      const textOk = !q || hay.includes(q);
      return catOk && textOk;
    }

    function renderCatalog() {
      const filtering = isFiltering();
      const matches = cards.filter(cardMatches);
      let shown = 0;

      cards.forEach((card) => {
        const match = cardMatches(card);
        const withinLimit = filtering || shown < visibleLimit;
        if (match && withinLimit) {
          const wasHidden = card.classList.contains("is-hidden");
          card.classList.remove("is-hidden");
          if (wasHidden) {
            card.classList.remove("is-revealing");
            void card.offsetWidth;
            card.classList.add("is-revealing");
          }
          shown += 1;
        } else {
          card.classList.add("is-hidden");
          card.classList.remove("is-revealing");
        }
      });

      if (emptyState) emptyState.hidden = matches.length !== 0;
      if (loadMoreBtn) {
        loadMoreBtn.parentElement.style.display =
          !filtering && matches.length > visibleLimit ? "block" : "none";
      }
      if (resultsCount) {
        resultsCount.textContent =
          matches.length === cards.length
            ? `Showing ${shown} of ${cards.length} Laravel systems`
            : `${matches.length} project${matches.length === 1 ? "" : "s"} match your filters`;
      }
    }

    searchInput?.addEventListener("input", () => {
      visibleLimit = INITIAL_VISIBLE;
      renderCatalog();
    });
    categorySelect?.addEventListener("change", () => {
      visibleLimit = INITIAL_VISIBLE;
      renderCatalog();
    });
    loadMoreBtn?.addEventListener("click", () => {
      visibleLimit = cards.length;
      renderCatalog();
    });
    resetBtn?.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categorySelect) categorySelect.value = "all";
      visibleLimit = INITIAL_VISIBLE;
      renderCatalog();
    });

    renderCatalog();

    // Quote modal
    const overlay = document.getElementById("quote-overlay");
    const projectField = document.getElementById("quote-project");
    const formView = document.getElementById("quote-form-view");
    const successView = document.getElementById("quote-success");
    const quoteForm = document.getElementById("quote-form");
    const successProject = document.getElementById("success-project");

    function openQuote(title) {
      if (!overlay) return;
      if (projectField) projectField.value = title;
      formView.hidden = false;
      successView.hidden = true;
      quoteForm?.reset();
      if (projectField) projectField.value = title;
      overlay.hidden = false;
      document.body.classList.add("modal-open");
      document.getElementById("quote-name")?.focus();
    }

    function closeQuote() {
      if (!overlay) return;
      overlay.hidden = true;
      document.body.classList.remove("modal-open");
    }

    grid.querySelectorAll(".quote-btn").forEach((btn) => {
      btn.addEventListener("click", () => openQuote(btn.dataset.project || ""));
    });

    document.getElementById("quote-close")?.addEventListener("click", closeQuote);
    document.getElementById("quote-done")?.addEventListener("click", closeQuote);
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) closeQuote();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay && !overlay.hidden) closeQuote();
    });

    quoteForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!quoteForm.checkValidity()) {
        quoteForm.reportValidity();
        return;
      }
      if (successProject) successProject.textContent = projectField.value;
      formView.hidden = true;
      successView.hidden = false;
    });
  }
});
