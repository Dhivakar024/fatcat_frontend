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

  // Counter animation with cleanup
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    if (!target) return;

    let current = 0;
    const increment = Math.max(1, Math.ceil(target / 40));
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.innerText = target;
        clearInterval(timer);
      } else {
        counter.innerText = current;
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

    window.openEnquiryModal = openModal;
    window.closeEnquiryModal = closeModal;

    // ─────────────────────────────────────────────────────
    // Show modal ONLY when website is opened initially OR refreshed/reloaded.
    // Must NOT automatically appear on inter-page navigation.
    const navEntries = (window.performance && typeof window.performance.getEntriesByType === "function") 
      ? window.performance.getEntriesByType("navigation") 
      : [];
    const isReload = (navEntries.length > 0 && navEntries[0].type === "reload") || 
      (window.performance && window.performance.navigation && window.performance.navigation.type === 1);
    const hasShownSession = sessionStorage.getItem("fatcat_enquiry_shown");

    if (isReload || !hasShownSession) {
      sessionStorage.setItem("fatcat_enquiry_shown", "true");
      if (document.readyState === "complete") {
        setTimeout(openModal, 1000);
      } else {
        window.addEventListener("load", () => {
          setTimeout(openModal, 1000);
        });
      }
    }

    // Manual triggers if clicked anywhere
    document.querySelectorAll("[data-open-enquiry], .btn-open-enquiry, a[href='#enquiryModal']").forEach(trigger => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
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

    // Handle Modal Enquiry Submission
    const modalForm = modal.querySelector("form");
    if (modalForm) {
      modalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const terms = modalForm.querySelector('#modalTerms, .terms-checkbox');
        if (terms && !terms.checked) {
          terms.focus();
          terms.classList.add("input-invalid");
          if (typeof showNotification === "function") {
            showNotification("Please agree to the Terms & Conditions to proceed.", "warning");
          }
          return;
        }

        const inputs = modalForm.querySelectorAll("input, textarea");
        const payload = {
          fullName: modalForm.querySelector('input[type="text"]')?.value.trim() || "",
          email: modalForm.querySelector('input[type="email"]')?.value.trim() || "",
          phone: modalForm.querySelector('input[type="tel"]')?.value.trim() || "",
          address: modalForm.querySelectorAll('input[type="text"]')[1]?.value.trim() || "",
          message: modalForm.querySelector('textarea')?.value.trim() || "",
          source: "popup_modal"
        };

        const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

        fetch(`${API_BASE}/enquiries`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })
        .then(async res => {
          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(data.detail || "Unable to submit your enquiry. Please try again.");
          }
          if (typeof showNotification === "function") {
            showNotification("Enquiry submitted successfully! We'll get back to you soon.", "success");
          }
          modalForm.reset();
          closeModal();
        })
        .catch(err => {
          console.warn("Enquiry error:", err);
          if (typeof showNotification === "function") {
            showNotification("Unable to submit your enquiry. Please try again.", "error");
          }
        });
      });
    }
  }

  // Handle In-page Consultation Form
  const inpageForm = document.querySelector(".form-box form");
  if (inpageForm) {
    inpageForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const terms = inpageForm.querySelector('#homeEnquiryTerms, .terms-checkbox');
      if (terms && !terms.checked) {
        terms.focus();
        terms.classList.add("input-invalid");
        if (typeof showNotification === "function") {
          showNotification("Please agree to the Terms & Conditions to proceed.", "warning");
        }
        return;
      }

      const payload = {
        fullName: inpageForm.querySelector('input[type="text"]')?.value.trim() || "",
        email: inpageForm.querySelector('input[type="email"]')?.value.trim() || "",
        phone: inpageForm.querySelector('input[type="tel"]')?.value.trim() || "",
        address: "",
        message: inpageForm.querySelector('textarea')?.value.trim() || "",
        source: "homepage_banner"
      };

      const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

      fetch(`${API_BASE}/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.detail || "Unable to submit your enquiry. Please try again.");
        }
        if (typeof showNotification === "function") {
          showNotification("Enquiry submitted successfully! We'll get back to you soon.", "success");
        }
        inpageForm.reset();
      })
      .catch(err => {
        console.warn("Inpage enquiry error:", err);
        if (typeof showNotification === "function") {
          showNotification("Unable to submit your enquiry. Please try again.", "error");
        }
      });
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
