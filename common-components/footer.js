document.addEventListener("DOMContentLoaded", function () {

    const footer = document.getElementById("footer");
    if (!footer) return;

    function getSiteBase() {
        if (window.location.protocol === "file:") {
            const p = window.location.pathname.replace(/\\/g, "/");
            return p.includes("/calculators/") ? "../../" : "../";
        }
        const known = ["home", "about", "services", "academy", "business", "career", "contact", "login", "signup", "zoho", "calculators", "privacy-center", "dashboard", "admin", "legal", "common-components"];
        const match = window.location.pathname.match(new RegExp(`^(.*?)\\/(?:${known.join("|")})(?:\\/|$)`, "i"));
        return (match && match[1]) ? match[1] : "";
    }

    function adjustComponentHtml(html) {
        const base = getSiteBase();
        if (!base) return html;

        if (base.endsWith("/")) {
            return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}`);
        }
        return html.replace(/(href|src)="\/(?!\/)/g, `$1="${base}/`);
    }

    // Robust fetch with sequential path fallbacks (works across root, subfolders, and file protocol)
    function loadFooterHtml() {
        const paths = [
            "../common-components/footer.html",
            "../../common-components/footer.html",
            "./common-components/footer.html",
            "/common-components/footer.html",
            "common-components/footer.html"
        ];

        let promise = Promise.reject();
        paths.forEach(p => {
            promise = promise.catch(() => {
                return fetch(p).then(res => {
                    if (!res.ok) throw new Error("Path failed: " + p);
                    return res.text();
                });
            });
        });
        return promise;
    }

    loadFooterHtml()
        .then(data => {
            footer.innerHTML = adjustComponentHtml(data);

            // Move floating cookie banner and legal modal directly to body to ensure
            // they float over the viewport and are never constrained by footer or page container styles
            const cookieBanner = document.getElementById("cookieConsent");
            if (cookieBanner && cookieBanner.parentElement !== document.body) {
                document.body.appendChild(cookieBanner);
            }

            const legalModal = document.getElementById("legalModal");
            if (legalModal && legalModal.parentElement !== document.body) {
                document.body.appendChild(legalModal);
            }

            initFooterAccordion();
            initLegalModal();
            initCookieConsent(); 
        })
        .catch(error => {
            console.error("Footer loading failed:", error);
        });

    function initFooterAccordion() {
        // Use event delegation so it works reliably after innerHTML inject
        document.addEventListener('click', function (e) {
            // Only act on mobile widths
            if (window.innerWidth > 600) return;

            const heading = e.target.closest('.footer-accordion-heading');
            if (!heading) return;

            const col = heading.closest('.footer-accordion');
            if (!col) return;

            col.classList.toggle('is-open');
        });
    }

    // =========================================================
    // UNIFIED TERMS & CONDITIONS AND LEGAL MODAL SYSTEM
    // =========================================================
    function initLegalModal() {
        const modal = document.getElementById("legalModal");
        if (!modal) return;

        const closeBtn = document.getElementById("closeLegalModalBtn");
        const acceptBtn = document.getElementById("acceptLegalBtn");
        const tabBtns = modal.querySelectorAll(".legal-tab-btn");
        const tabContents = modal.querySelectorAll(".legal-tab-content");
        const modalBody = modal.querySelector(".legal-modal-body");

        // Per-form state tracker using WeakMap keyed by DOM Form elements:
        // Ensures complete isolation and zero collision across all forms on the page
        const formTermsState = new WeakMap();

        function getFormState(form) {
            if (!form || typeof form !== "object") {
                return { opened: false, scrolledToBottom: false, checkbox: null };
            }
            if (!formTermsState.has(form)) {
                const cb = form.querySelector('.terms-checkbox, #modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms, #academyTerms, input[data-terms-checkbox]');
                formTermsState.set(form, {
                    opened: false,
                    scrolledToBottom: false,
                    checkbox: cb
                });
            }
            return formTermsState.get(form);
        }

        let activeSourceForm = null;
        let currentActiveTab = "terms";

        function switchTab(tabName) {
            currentActiveTab = tabName;
            tabBtns.forEach(btn => {
                btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
            });
            tabContents.forEach(content => {
                content.classList.toggle("active", content.id === `legal-${tabName}`);
            });
        }

        function openModal(tabName = "terms", sourceForm = null) {
            currentActiveTab = tabName;
            switchTab(tabName);
            modal.classList.add("active");
            document.body.style.overflow = "hidden";

            if (sourceForm) {
                activeSourceForm = sourceForm;
            } else if (!activeSourceForm) {
                const visibleModalForm = document.querySelector(".enquiry-modal.active form, .modal.active form");
                activeSourceForm = visibleModalForm || null;
            }

            if (activeSourceForm) {
                const state = getFormState(activeSourceForm);
                state.opened = true;
            }

            if (tabName === "terms" && modalBody) {
                const state = activeSourceForm ? getFormState(activeSourceForm) : null;
                if (state && state.scrolledToBottom) {
                    if (acceptBtn) {
                        acceptBtn.textContent = "Terms Reviewed - Close";
                        acceptBtn.classList.add("terms-completed");
                    }
                } else {
                    modalBody.scrollTop = 0;
                    if (acceptBtn) {
                        acceptBtn.textContent = "Understood & Close";
                        acceptBtn.classList.remove("terms-completed");
                    }
                }
            }
        }

        function closeModal() {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }

        function enableCheckboxForForm(form) {
            if (!form) return;
            const state = getFormState(form);
            state.scrolledToBottom = true;

            const cb = state.checkbox || form.querySelector('.terms-checkbox, #modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms, #academyTerms, input[data-terms-checkbox]');
            if (cb) {
                cb.disabled = false;
                cb.removeAttribute("disabled");
                cb.classList.remove("terms-disabled");
                cb.classList.add("terms-unlocked", "terms-ready");
                const group = cb.closest(".modal-terms, .contact-terms-group, .form-terms, .terms-group, .form-group");
                if (group) group.classList.add("terms-unlocked");
            }

            if (acceptBtn) {
                acceptBtn.textContent = "Terms Reviewed - Close";
                acceptBtn.classList.add("terms-completed");
            }
        }

        function checkTermsScrollBottom() {
            if (!modalBody || currentActiveTab !== "terms" || !activeSourceForm) return;

            // Strict requirements:
            // 1. User must have actually scrolled down (scrollTop > 20)
            // 2. User must have reached near the bottom (tolerance = 25px)
            const tolerance = 25;
            const hasScrolled = modalBody.scrollTop > 20;
            const isBottom = modalBody.scrollTop + modalBody.clientHeight >= modalBody.scrollHeight - tolerance;

            if (hasScrolled && isBottom) {
                const state = getFormState(activeSourceForm);
                if (!state.scrolledToBottom) {
                    enableCheckboxForForm(activeSourceForm);
                }
            }
        }

        if (modalBody) {
            modalBody.addEventListener("scroll", checkTermsScrollBottom, { passive: true });
        }

        // Initialize all checkboxes across the DOM to disabled state
        function initAllCheckboxes() {
            const checkboxes = document.querySelectorAll(
                '#modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms, #academyTerms, .terms-checkbox, input[data-terms-checkbox]'
            );
            checkboxes.forEach(cb => {
                const form = cb.closest("form");
                const state = form ? getFormState(form) : null;
                if (!state || !state.scrolledToBottom) {
                    cb.disabled = true;
                    cb.setAttribute("disabled", "disabled");
                    cb.classList.add("terms-disabled");
                    cb.classList.remove("terms-unlocked", "terms-ready");
                }
            });
        }
        initAllCheckboxes();
        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", initAllCheckboxes);
        }

        // Click delegation on "Terms & Conditions" link
        document.addEventListener("click", (e) => {
            const link = e.target.closest(".open-legal-tab, [data-legal], a[href*='privacy-policy'], a[href*='terms-of-use'], a[href*='disclaimer'], a[href='#privacy-policy'], a[href='#terms-of-use'], a[href='#disclaimer']");
            if (link) {
                e.preventDefault();
                let tab = link.getAttribute("data-legal");
                if (!tab) {
                    const href = link.getAttribute("href") || "";
                    if (href.includes("privacy")) tab = "privacy";
                    else if (href.includes("terms")) tab = "terms";
                    else if (href.includes("disclaimer")) tab = "disclaimer";
                    else tab = "terms";
                }

                const sourceForm = link.closest("form") || document.querySelector(".enquiry-modal.active form, form");
                if (sourceForm) {
                    activeSourceForm = sourceForm;
                    const state = getFormState(sourceForm);
                    state.opened = true;
                }
                openModal(tab, sourceForm);
                return;
            }

            // Friendly guidance if clicking a disabled checkbox
            const termsGroup = e.target.closest(".modal-terms, .contact-terms-group, .form-terms, .terms-group");
            if (termsGroup && !e.target.closest("a")) {
                const cb = termsGroup.querySelector(".terms-checkbox");
                if (cb && cb.disabled) {
                    e.preventDefault();
                    notifyWarning("Please click 'Terms & Conditions' to read them before accepting.", "info");
                }
            }
        });

        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const tab = btn.getAttribute("data-tab");
                if (tab) switchTab(tab);
            });
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        if (acceptBtn) {
            acceptBtn.addEventListener("click", () => {
                closeModal();
            });
        }

        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                closeModal();
            }
        });

        // =========================================================
        // FORM SUBMISSION VALIDATION ENGINE
        // =========================================================
        function validateFormTerms(form, showToast = true) {
            if (!form) return { valid: true };
            const cb = form.querySelector('.terms-checkbox, #modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms, #academyTerms, input[data-terms-checkbox]');
            if (!cb) return { valid: true };

            const state = getFormState(form);

            // Case 1: Terms not opened
            if (!state.opened) {
                const msg = "Please review the Terms & Conditions before submitting.";
                if (showToast) {
                    highlightTermsElement(form, cb);
                    notifyWarning(msg, "warning");
                }
                return { valid: false, message: msg, caseNumber: 1 };
            }

            // Case 2: Terms opened but user has NOT reached bottom
            if (!state.scrolledToBottom) {
                const msg = "Please read the Terms & Conditions completely before accepting.";
                if (showToast) {
                    highlightTermsElement(form, cb);
                    notifyWarning(msg, "warning");
                }
                return { valid: false, message: msg, caseNumber: 2 };
            }

            // Case 3: User reaches bottom but does NOT check checkbox
            if (!cb.checked) {
                const msg = "Please accept the Terms & Conditions to continue.";
                if (showToast) {
                    cb.focus();
                    cb.classList.add("input-invalid");
                    notifyWarning(msg, "warning");
                }
                return { valid: false, message: msg, caseNumber: 3 };
            }

            // Case 4: User reaches bottom AND checks checkbox
            cb.classList.remove("input-invalid");
            return { valid: true, caseNumber: 4 };
        }

        function highlightTermsElement(form, cb) {
            const termsLink = form.querySelector('.open-legal-tab, [data-legal="terms"], a[href*="terms"]') || cb;
            if (termsLink) {
                try { termsLink.focus(); } catch (_) {}
                termsLink.classList.add("terms-highlight-pulse");
                setTimeout(() => termsLink.classList.remove("terms-highlight-pulse"), 2500);
            }
            const group = cb ? cb.closest(".modal-terms, .contact-terms-group, .form-terms, .terms-group, .form-group") : null;
            if (group) {
                group.classList.add("terms-group-highlight");
                setTimeout(() => group.classList.remove("terms-group-highlight"), 2500);
            }
            if (cb) {
                cb.classList.add("input-invalid");
                setTimeout(() => cb.classList.remove("input-invalid"), 2500);
            }
        }

        function notifyWarning(message, type = "warning") {
            if (typeof window.showNotification === "function") {
                window.showNotification(message, type);
            } else if (window.fatcatToast && typeof window.fatcatToast.show === "function") {
                window.fatcatToast.show(message, type);
            } else {
                alert(message);
            }
        }

        // Intercept clicks on form submit buttons in capture phase to show exact terms error
        // before browser HTML5 popups or bubbling handlers
        document.addEventListener("click", (e) => {
            const btn = e.target.closest('button[type="submit"], input[type="submit"], .contact-btn, .submit-btn, .academy-submit-btn');
            if (!btn) return;

            const form = btn.closest("form");
            if (!form) return;

            const cb = form.querySelector('.terms-checkbox, #modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms, #academyTerms, input[data-terms-checkbox]');
            if (!cb) return;

            const res = validateFormTerms(form, false);
            if (!res.valid) {
                e.preventDefault();
                e.stopImmediatePropagation();
                validateFormTerms(form, true);
                return false;
            }
        }, true);

        // Prevent default native bubble on terms checkbox if invalid is triggered
        document.addEventListener("invalid", (e) => {
            const target = e.target;
            if (target && target.matches && target.matches('.terms-checkbox, #modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, #careerTerms, #academyTerms, input[data-terms-checkbox]')) {
                e.preventDefault();
                const form = target.closest("form");
                if (form) {
                    validateFormTerms(form, true);
                }
            }
        }, true);

        // Global capture-phase submit guard (for Enter key or programmatic submit)
        document.addEventListener("submit", (e) => {
            const form = e.target;
            if (!form || form.tagName !== "FORM") return;

            const res = validateFormTerms(form, true);
            if (!res.valid) {
                e.preventDefault();
                e.stopImmediatePropagation();
                return false;
            }
        }, true);

        // Expose global TermsManager API for page-level scripts
        window.TermsManager = {
            openTerms: (form) => openModal("terms", form),
            validate: (form, showToast = true) => {
                const res = validateFormTerms(form, showToast);
                return res.valid;
            },
            getState: (form) => getFormState(form),
            unlock: (form) => enableCheckboxForForm(form),
            initCheckboxes: initAllCheckboxes
        };
        window.openLegalModal = openModal;
        window.closeLegalModal = closeModal;
    }

});

function initCookieConsent() {
    const banner = document.getElementById("cookieConsent");
    if (!banner) return;

    const acceptBtn = document.getElementById("cookieAcceptBtn");
    const declineBtn = document.getElementById("cookieDeclineBtn");
    const prefBtn = document.getElementById("cookiePreferencesBtn");
    const prefPanel = document.getElementById("cookiePreferencesPanel");
    const savePrefBtn = document.getElementById("cookieSavePrefBtn");
    const cancelPrefBtn = document.getElementById("cookieCancelPrefBtn");
    const prefAnalytics = document.getElementById("prefAnalytics");
    const prefMarketing = document.getElementById("prefMarketing");

    const COOKIE_CONSENT_KEY = "fatcat_cookie_consent";
    const COOKIE_PREFS_KEY = "fatcat_cookie_preferences";

    function hideBanner() {
        banner.classList.remove("active");
        if (prefPanel) {
            prefPanel.classList.remove("active");
        }
    }

    function showBanner(openPreferences = false) {
        banner.classList.add("active");
        if (openPreferences && prefPanel) {
            prefPanel.classList.add("active");
        }
    }

    function hasUserConsented() {
        try {
            const consent = localStorage.getItem(COOKIE_CONSENT_KEY) || localStorage.getItem("cookieConsent");
            return consent === "accepted";
        } catch (e) {
            return false;
        }
    }

    function applySavedPreferencesToUI() {
        try {
            const raw = localStorage.getItem(COOKIE_PREFS_KEY) || localStorage.getItem("cookiePreferences");
            if (raw) {
                const saved = JSON.parse(raw);
                if (prefAnalytics && typeof saved.analytics === "boolean") {
                    prefAnalytics.checked = saved.analytics;
                }
                if (prefMarketing && typeof saved.marketing === "boolean") {
                    prefMarketing.checked = saved.marketing;
                }
            }
        } catch (e) {}
    }

    // Check stored consent immediately:
    // If already accepted, keep banner completely hidden (no flash, no banner on reload/navigation)
    if (hasUserConsented()) {
        hideBanner();
        applySavedPreferencesToUI();
    } else {
        showBanner(false);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            const prefs = {
                necessary: true,
                analytics: true,
                marketing: true
            };
            try {
                localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
                localStorage.setItem("cookieConsent", "accepted");
                localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
                localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
            } catch (e) {}
            if (prefAnalytics) prefAnalytics.checked = true;
            if (prefMarketing) prefMarketing.checked = true;
            hideBanner();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener("click", () => {
            hideBanner();
        });
    }

    if (prefBtn && prefPanel) {
        prefBtn.addEventListener("click", () => {
            applySavedPreferencesToUI();
            prefPanel.classList.toggle("active");
        });
    }

    if (savePrefBtn) {
        savePrefBtn.addEventListener("click", () => {
            const prefs = {
                necessary: true,
                analytics: prefAnalytics ? prefAnalytics.checked : true,
                marketing: prefMarketing ? prefMarketing.checked : true
            };
            try {
                localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
                localStorage.setItem("cookieConsent", "accepted");
                localStorage.setItem(COOKIE_PREFS_KEY, JSON.stringify(prefs));
                localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
            } catch (e) {}
            hideBanner();
        });
    }

    if (cancelPrefBtn && prefPanel) {
        cancelPrefBtn.addEventListener("click", () => {
            if (hasUserConsented()) {
                hideBanner();
            } else {
                prefPanel.classList.remove("active");
            }
        });
    }

    // Global listener to reopen cookie settings whenever user clicks footer/legal cookie links
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("#footerCookieSettingsLink, .open-cookie-settings, a[href*='cookie-settings'], a[href='#cookie-settings']");
        if (trigger) {
            e.preventDefault();
            applySavedPreferencesToUI();
            showBanner(true);
        }
    });

    window.openCookieConsent = function (openPreferences = false) {
        applySavedPreferencesToUI();
        showBanner(openPreferences);
    };
    window.closeCookieConsent = hideBanner;
}