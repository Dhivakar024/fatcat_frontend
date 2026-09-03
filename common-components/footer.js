document.addEventListener("DOMContentLoaded", function () {

    const footer = document.getElementById("footer");
    if (!footer) return;

    // Robust fetch with sequential path fallbacks (works across root, subfolders, and file protocol)
    function loadFooterHtml() {
        const paths = [
            "/common-components/footer.html",
            "../common-components/footer.html",
            "../../common-components/footer.html",
            "./common-components/footer.html",
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
            footer.innerHTML = data;

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

    function initLegalModal() {
        const modal = document.getElementById("legalModal");
        if (!modal) return;

        const closeBtn = document.getElementById("closeLegalModalBtn");
        const acceptBtn = document.getElementById("acceptLegalBtn");
        const tabBtns = modal.querySelectorAll(".legal-tab-btn");
        const tabContents = modal.querySelectorAll(".legal-tab-content");

        function switchTab(tabName) {
            tabBtns.forEach(btn => {
                btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
            });
            tabContents.forEach(content => {
                content.classList.toggle("active", content.id === `legal-${tabName}`);
            });
        }

        let currentActiveTab = "terms";

        function openModal(tabName = "terms") {
            currentActiveTab = tabName;
            switchTab(tabName);
            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        }

        function closeModal() {
            if (currentActiveTab === "terms") {
                unlockTermsCheckboxes();
            }
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }

        function unlockTermsCheckboxes() {
            const checkboxes = document.querySelectorAll(
                '#modalTerms, #homeEnquiryTerms, #contactTerms, #signupTerms, .terms-checkbox, input[data-terms-checkbox]'
            );
            checkboxes.forEach(cb => {
                cb.disabled = false;
                cb.removeAttribute("disabled");
                cb.checked = true;
                cb.dispatchEvent(new Event("change", { bubbles: true }));
                cb.dispatchEvent(new Event("input", { bubbles: true }));
                cb.classList.add("terms-unlocked");
                const group = cb.closest(".modal-terms, .contact-terms-group, .form-terms, .terms-group, .form-group");
                if (group) {
                    group.classList.add("terms-unlocked");
                }
            });
            window.dispatchEvent(new CustomEvent("termsUnderstood"));
        }

        tabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const tab = btn.getAttribute("data-tab");
                if (tab) switchTab(tab);
            });
        });

        if (closeBtn) closeBtn.addEventListener("click", closeModal);

        if (acceptBtn) {
            acceptBtn.addEventListener("click", () => {
                unlockTermsCheckboxes();
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

        // Global delegate to open modal when clicking legal links across the page
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
                openModal(tab);
                return;
            }

            // If user clicks a disabled terms checkbox or its container, open Terms & Conditions modal directly
            const disabledTerms = e.target.closest('.terms-checkbox[disabled], .modal-terms input[disabled], .contact-terms-group input[disabled]');
            if (disabledTerms) {
                e.preventDefault();
                openModal("terms");
            }
        });

        // Guard against form submission if terms checkbox is disabled / unaccepted
        document.addEventListener("submit", (e) => {
            const form = e.target;
            const termsCb = form.querySelector('#modalTerms, #homeEnquiryTerms, #contactTerms, .terms-checkbox');
            if (termsCb) {
                if (termsCb.disabled) {
                    e.preventDefault();
                    openModal("terms");
                    return false;
                } else if (!termsCb.checked) {
                    e.preventDefault();
                    termsCb.focus();
                    return false;
                }
            }
        });

        window.openLegalModal = openModal;
        window.closeLegalModal = closeModal;
        window.unlockTermsCheckboxes = unlockTermsCheckboxes;
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

    // Check if the current page load is a refresh / reload
    let isReload = false;
    try {
        const perfEntries = performance.getEntriesByType && performance.getEntriesByType("navigation");
        if (perfEntries && perfEntries.length > 0 && perfEntries[0].type === "reload") {
            isReload = true;
        } else if (window.performance && window.performance.navigation && window.performance.navigation.type === 1) {
            isReload = true;
        }
    } catch (e) {
        isReload = false;
    }

    // If the user refreshed the page, clear any temporary accepted state so it displays freshly
    if (isReload) {
        sessionStorage.removeItem("cookieAcceptedInSession");
    }

    const isAcceptedInSession = sessionStorage.getItem("cookieAcceptedInSession");

    // Display banner across all pages until user accepts
    if (isAcceptedInSession === "true") {
        hideBanner();
    } else {
        showBanner();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            sessionStorage.setItem("cookieAcceptedInSession", "true");
            localStorage.setItem("cookieConsent", "accepted");
            localStorage.setItem("cookiePreferences", JSON.stringify({
                necessary: true,
                analytics: true,
                marketing: true
            }));
            if (prefAnalytics) prefAnalytics.checked = true;
            if (prefMarketing) prefMarketing.checked = true;
            hideBanner();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener("click", () => {
            // Temporarily hide on the current page, but DO NOT mark accepted,
            // so it continues to appear when navigating to other pages
            hideBanner();
        });
    }

    if (prefBtn && prefPanel) {
        prefBtn.addEventListener("click", () => {
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
            sessionStorage.setItem("cookieAcceptedInSession", "true");
            localStorage.setItem("cookieConsent", "accepted");
            localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
            hideBanner();
        });
    }

    if (cancelPrefBtn && prefPanel) {
        cancelPrefBtn.addEventListener("click", () => {
            prefPanel.classList.remove("active");
        });
    }

    // Global listener to reopen cookie settings whenever user clicks footer/legal cookie links
    document.addEventListener("click", (e) => {
        const trigger = e.target.closest("#footerCookieSettingsLink, .open-cookie-settings, a[href*='cookie-settings'], a[href='#cookie-settings']");
        if (trigger) {
            e.preventDefault();
            showBanner(true);
        }
    });

    window.openCookieConsent = showBanner;
    window.closeCookieConsent = hideBanner;
}