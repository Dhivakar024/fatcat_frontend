console.log("[FatCat Contact] contact.js loaded");

// Document-level capture phase: prevents browser navigation even before any bubbling or native submit
document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "contact-form") {
        e.preventDefault();
        console.log("[FatCat Contact] SUBMIT EVENT FIRED (document capture)");
        console.log("[FatCat Contact] defaultPrevented =", e.defaultPrevented);
    }
}, true);

function setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) {
        console.warn("[FatCat Contact] contact-form not found in DOM yet.");
        return;
    }

    if (contactForm.dataset.fatcatBound === "true") {
        return;
    }
    contactForm.dataset.fatcatBound = "true";
    console.log("[FatCat Contact] contact-form found");

    contactForm.addEventListener("submit", async function (e) {
        // Prevent default immediately as the very first operation
        e.preventDefault();
        e.stopPropagation();

        console.log("[FatCat Contact] SUBMIT EVENT FIRED");
        console.log("[FatCat Contact] defaultPrevented =", e.defaultPrevented);

        if (window.TermsManager && typeof window.TermsManager.validate === "function") {
            if (!window.TermsManager.validate(contactForm, true)) {
                return;
            }
        } else {
            const termsCb = contactForm.querySelector("#contactTerms, .terms-checkbox");
            if (termsCb && !termsCb.checked) {
                termsCb.focus();
                termsCb.classList.add("input-invalid");
                if (typeof showNotification === "function") {
                    showNotification("Please accept the Terms & Conditions to continue.", "warning");
                } else {
                    alert("Please accept the Terms & Conditions to continue.");
                }
                return;
            }
        }

        const submitBtn = contactForm.querySelector('button[type="submit"], .contact-btn');
        const originalText = submitBtn ? submitBtn.textContent : "SEND";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "SENDING...";
        }

        const formData = new FormData(contactForm);
        const payload = {
            name: (formData.get("name") || "").trim(),
            email: (formData.get("email") || "").trim(),
            phone: (formData.get("phone") || "").trim(),
            location: (formData.get("location") || "").trim(),
            subject: (formData.get("subject") || "General Enquiry").trim(),
            message: (formData.get("message") || "").trim()
        };

        if (!payload.name || !payload.email || !payload.phone || !payload.location) {
            if (typeof showNotification === "function") {
                showNotification("Please fill in all required fields.", "warning");
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
            return;
        }

        const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

        console.log(`[FatCat Contact] Sending POST request to ${API_BASE}/contact`, payload);

        try {
            const res = await fetch(`${API_BASE}/contact`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            console.log(`[FatCat Contact] Response status: ${res.status}`);
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.detail || "Unable to submit the contact form. Please try again.");
            }

            console.log("[FatCat Contact] Submission successful:", data);
            if (typeof showNotification === "function") {
                showNotification("Contact form submitted successfully!", "success");
            }
            contactForm.reset();
        } catch (err) {
            console.error("[FatCat Contact] Form submission failed:", err);
            if (typeof showNotification === "function") {
                showNotification("Unable to submit the contact form. Please try again.", "error");
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// Bind immediately since contact.js loads at bottom of page
setupContactForm();
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupContactForm);
}
window.addEventListener("load", setupContactForm);

/* UI & Navigation */
try {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }
} catch (e) {
    console.warn("[FatCat Contact] Hamburger error:", e);
}


/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

if (dropdown && dropbtn) {
    dropbtn.addEventListener("click", (event) => {

        if (window.innerWidth <= 900) {
            event.preventDefault();
            dropdown.classList.toggle("open");
        }

    });
}


const reveals = document.querySelectorAll(".reveal-left, .reveal-right");

function revealOnScroll(){
    const trigger = window.innerHeight * 0.85;
    reveals.forEach(el=>{
        const top = el.getBoundingClientRect().top;
        if(top < trigger){
            el.classList.add("reveal-active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);


const heroContent = document.querySelector(".hero-content");

window.addEventListener("load", () => {
    if (heroContent) heroContent.classList.add("show");
});

try {
    if (typeof ScrollReveal !== "undefined") {
        ScrollReveal().reveal('.hero-title', {
            delay:200,
            distance:'40px',
            origin:'bottom',
            duration:1000
        });

        ScrollReveal().reveal('.hero-subtitle', {
            delay:400,
            distance:'40px',
            origin:'bottom',
            duration:1000
        });
    }
} catch (e) {
    console.warn("[FatCat Contact] ScrollReveal error:", e);
}

function syncMapHeight() {
    if (window.innerWidth > 992) {
        const contactLeft = document.querySelector(".contact-left");
        const mapLabel = document.querySelector(".map-label");
        const iframe = document.querySelector(".contact-right iframe");
        if (contactLeft && mapLabel && iframe) {
            const leftHeight = contactLeft.offsetHeight;
            const labelStyle = window.getComputedStyle(mapLabel);
            const labelMarginBottom = parseFloat(labelStyle.marginBottom || 0);
            const labelHeight = mapLabel.offsetHeight + labelMarginBottom;
            const targetIframeHeight = leftHeight - labelHeight;
            if (targetIframeHeight > 250) {
                iframe.style.height = targetIframeHeight + "px";
            }
        }
    } else {
        const iframe = document.querySelector(".contact-right iframe");
        if (iframe) iframe.style.height = "";
    }
}

window.addEventListener("load", syncMapHeight);
window.addEventListener("resize", syncMapHeight);
document.addEventListener("DOMContentLoaded", syncMapHeight);


