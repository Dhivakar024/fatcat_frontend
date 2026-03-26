document.addEventListener("DOMContentLoaded", () => {

  /* ================= NAVBAR ================= */
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

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

    // Show modal after page load
    window.addEventListener("load", () => {
        setTimeout(() => {
            modal.style.display = "flex";
        }, 1000); // delay for better UX
    });

    // Close button
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close when clicking outside
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    
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
  const cta = document.querySelector(".cta-content");

  if (cta) {
    window.addEventListener("scroll", () => {
      const trigger = window.innerHeight * 0.85;

      if (cta.getBoundingClientRect().top < trigger) {
        cta.classList.add("show");
      }
    });
  }

  /* ================= SWIPER ================= */
  if (typeof Swiper !== "undefined") {
    new Swiper(".testimonial-slider", {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    });
  } else {
    console.log("Swiper not loaded");
  }

});