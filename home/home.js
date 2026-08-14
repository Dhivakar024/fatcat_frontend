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
  //counter
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    setInterval( ()=> {
      let current = +counter.innerText;
      if(current < target) {
        counter.innerText = current + 1;
      
      }
    },30);
  });

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
