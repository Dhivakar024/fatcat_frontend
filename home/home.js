document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR ================= */

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  /* ================= ZOHO PARTNER ================= */

  const zohoNav = document.getElementById("navMenu");

  if (zohoNav && !zohoNav.querySelector(".zoho-partner-link")) {

    const zohoLink = document.createElement("a");

    zohoLink.href = "../zoho/zoho.html";
    zohoLink.className = "zoho-partner-link";
    zohoLink.textContent = "Zoho Partner";

    const contactLink = zohoNav.querySelector(".contact-btn");

    if (contactLink) {
      zohoNav.insertBefore(zohoLink, contactLink);
    } else {
      zohoNav.appendChild(zohoLink);
    }

  }

  //counter
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");

    setInterval(() => {

      let current = +counter.innerText;

      if (current < target) {
        counter.innerText = current + 1;
      }

    }, 30);

  });

  /* REST OF YOUR EXISTING CODE... */

  /* ================= MOBILE DROPDOWN ================= */
  const dropdown = document.querySelector(".dropdown");
  const dropbtn = document.querySelector(".dropbtn");

  if (dropdown && dropbtn) {
    dropbtn.addEventListener("click", () => {
      dropdown.classList.toggle("open");
    });
  }


  const modal = document.getElementById("enquiryModal");
  const closeBtn = document.getElementById("closeModalBtn");
  const cancelBtn = modal ? modal.querySelector(".btn-cancel") : null;

  if (modal) {

    function openModal() {
      modal.style.display = "flex";
    }

    function closeModal() {
      modal.style.display = "none";
    }
    // ─────────────────────────────────────────────────────

    // Show modal 1 s after page finishes loading
    window.addEventListener("load", () => {
      setTimeout(openModal, 1000);
    });

    // Close via ✕ button
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }
    

    // Close via Cancel button (it's type="reset" — also close the modal)
    if (cancelBtn) {
      cancelBtn.addEventListener("click", closeModal);
    }

    // Close when clicking the dark backdrop (outside the form box)
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Close with Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.style.display === "flex") closeModal();
    });
  }


  /* ================= WHATSAPP FLOATING BUTTON ================= */
  const whatsappFloat = document.querySelector(".whatsapp-float");

  if (whatsappFloat) {
    const updateWhatsappFloat = () => {
      whatsappFloat.classList.toggle("scrolled", window.scrollY > 120);
    };

    updateWhatsappFloat();
    window.addEventListener("scroll", updateWhatsappFloat, { passive: true });
  }

  /* ================= HERO ANIMATION ================= */
  const heroText = document.querySelector(".hero-content");

  if (heroText) {
    heroText.style.opacity = "0";

    setTimeout(() => {
      heroText.style.opacity = "1";
      heroText.style.transition = "1s";
    }, 300);
  }

  /* ================= SCROLL REVEAL ================= */
  const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 120) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

  /* ================= CARD REVEAL ================= */
  const revealElements = document.querySelectorAll(".reveal-up");

  function revealCards() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 120) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealCards);

  /* ================= LEARNING SECTION ================= */
  const learning = document.querySelector(".learning-content");

  if (learning) {
    window.addEventListener("scroll", () => {
      const trigger = window.innerHeight * 0.85;

      if (learning.getBoundingClientRect().top < trigger) {
        learning.classList.add("show");
      }
    });
  }

  /* ================= START ITEMS ================= */
  const items = document.querySelectorAll(".start-item");

  items.forEach(item => {
    item.addEventListener("click", () => {
      items.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  /* ================= TAB SYSTEM ================= */
  const buttons = document.querySelectorAll(".learn-btn");
  const cards = document.querySelectorAll(".learn-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {

      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const target = btn.getAttribute("data-tab");

      cards.forEach(card => card.classList.remove("active"));

      const targetElement = document.getElementById(target);

      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });

  /* ================= CTA SECTION ================= */
  /* Start the brand logos at the right edge when this section is first seen. */
  const brandSection = document.querySelector(".brand-section");

  if (brandSection && "IntersectionObserver" in window) {
    const brandObserver = new IntersectionObserver((entries, observer) => {
      if (entries[0].isIntersecting) {
        brandSection.classList.add("brand-scroll-started");
        observer.unobserve(brandSection);
      }
    }, { threshold: 0.2 });

    brandObserver.observe(brandSection);
  } else if (brandSection) {
    brandSection.classList.add("brand-scroll-started");
  }

  const cta = document.querySelector(".cta-content");

  if (cta) {
    window.addEventListener("scroll", () => {
      const trigger = window.innerHeight * 0.85;

      if (cta.getBoundingClientRect().top < trigger) {
        cta.classList.add("show");
      }
    });
  }

  /* ================= TESTIMONIAL MARQUEE ================= */
  const testimonialTrack = document.querySelector(".testimonial-track");

  if (testimonialTrack) {
    const cards = Array.from(testimonialTrack.children);

    cards.forEach((card) => {
      const duplicate = card.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");

      duplicate.querySelectorAll("img").forEach((image) => {
        image.alt = "";
      });

      testimonialTrack.appendChild(duplicate);
    });
  }

});
