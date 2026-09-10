/**
 * FatCat Wealthy - Global Reusable Notification / Toast System
 *
 * Usage:
 *   showNotification("Contact form submitted successfully!", "success");
 *   showNotification("Unable to submit the contact form. Please try again.", "error");
 *   showNotification("Please check your input.", "warning");
 *   showNotification("New update available.", "info");
 */

(function () {
    const TOAST_CONTAINER_ID = "fatcat-toast-container";
    const DEFAULT_DURATION = 4500; // ms

    const ICONS = {
        success: "fa-solid fa-circle-check",
        error: "fa-solid fa-circle-xmark",
        warning: "fa-solid fa-triangle-exclamation",
        info: "fa-solid fa-circle-info"
    };

    const TITLES = {
        success: "Success",
        error: "Error",
        warning: "Notice",
        info: "Information"
    };

    function ensureStyles() {
        if (document.getElementById("fatcat-toast-styles")) return;
        const style = document.createElement("style");
        style.id = "fatcat-toast-styles";
        style.textContent = `
            #fatcat-toast-container {
                position: fixed;
                top: 24px;
                right: 24px;
                z-index: 99999999;
                display: flex;
                flex-direction: column;
                gap: 12px;
                max-width: 420px;
                width: calc(100% - 48px);
                pointer-events: none;
            }
            .fatcat-toast {
                position: relative;
                pointer-events: auto;
                display: flex;
                align-items: flex-start;
                gap: 14px;
                padding: 16px 20px;
                border-radius: 12px;
                font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                font-size: 14px;
                line-height: 1.5;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.06);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                opacity: 0;
                transform: translateX(45px);
                transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease, margin-top 0.3s ease;
                overflow: hidden;
                user-select: none;
            }
            .fatcat-toast.toast-visible {
                opacity: 1;
                transform: translateX(0);
            }
            .fatcat-toast.toast-hiding {
                opacity: 0;
                transform: translateX(45px);
            }
            .fatcat-toast-icon {
                font-size: 18px;
                margin-top: 2px;
                flex-shrink: 0;
            }
            .fatcat-toast-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            .fatcat-toast-title {
                font-weight: 600;
                font-size: 14px;
                line-height: 1.3;
            }
            .fatcat-toast-message {
                font-weight: 400;
                font-size: 13.5px;
                line-height: 1.45;
            }
            .fatcat-toast-close {
                background: transparent;
                border: none;
                cursor: pointer;
                font-size: 18px;
                line-height: 1;
                padding: 0 0 0 8px;
                opacity: 0.55;
                transition: opacity 0.2s ease, transform 0.15s ease;
                flex-shrink: 0;
                color: inherit;
            }
            .fatcat-toast-close:hover {
                opacity: 1;
                transform: scale(1.15);
            }
            .fatcat-toast-progress {
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                transform-origin: left;
                transition: transform linear;
            }
            .fatcat-toast-success {
                background: rgba(240, 253, 250, 0.96);
                border: 1.5px solid #5eead4;
                color: #0f766e;
            }
            .fatcat-toast-success .fatcat-toast-icon { color: #14919B; }
            .fatcat-toast-success .fatcat-toast-title { color: #0d5f57; }
            .fatcat-toast-success .fatcat-toast-progress { background: #14919B; }

            .fatcat-toast-error {
                background: rgba(254, 242, 242, 0.96);
                border: 1.5px solid #fca5a5;
                color: #991b1b;
            }
            .fatcat-toast-error .fatcat-toast-icon { color: #ef4444; }
            .fatcat-toast-error .fatcat-toast-title { color: #7f1d1d; }
            .fatcat-toast-error .fatcat-toast-progress { background: #ef4444; }

            .fatcat-toast-warning {
                background: rgba(254, 252, 232, 0.96);
                border: 1.5px solid #fde047;
                color: #854d0e;
            }
            .fatcat-toast-warning .fatcat-toast-icon { color: #f59e0b; }
            .fatcat-toast-warning .fatcat-toast-title { color: #713f12; }
            .fatcat-toast-warning .fatcat-toast-progress { background: #f59e0b; }

            .fatcat-toast-info {
                background: rgba(240, 249, 255, 0.96);
                border: 1.5px solid #7dd3fc;
                color: #075985;
            }
            .fatcat-toast-info .fatcat-toast-icon { color: #0284c7; }
            .fatcat-toast-info .fatcat-toast-title { color: #0369a1; }
            .fatcat-toast-info .fatcat-toast-progress { background: #0284c7; }

            body.dark-mode .fatcat-toast, html.dark-mode .fatcat-toast {
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.55), 0 3px 10px rgba(0, 0, 0, 0.35);
            }
            body.dark-mode .fatcat-toast-success, html.dark-mode .fatcat-toast-success {
                background: rgba(13, 27, 33, 0.94);
                border-color: rgba(20, 145, 155, 0.6);
                color: #e6fffa;
            }
            body.dark-mode .fatcat-toast-success .fatcat-toast-icon, html.dark-mode .fatcat-toast-success .fatcat-toast-icon { color: #2dd4bf; }
            body.dark-mode .fatcat-toast-success .fatcat-toast-title, html.dark-mode .fatcat-toast-success .fatcat-toast-title { color: #ffffff; }

            body.dark-mode .fatcat-toast-error, html.dark-mode .fatcat-toast-error {
                background: rgba(30, 15, 18, 0.94);
                border-color: rgba(239, 68, 68, 0.6);
                color: #ffe4e6;
            }
            body.dark-mode .fatcat-toast-error .fatcat-toast-icon, html.dark-mode .fatcat-toast-error .fatcat-toast-icon { color: #f87171; }
            body.dark-mode .fatcat-toast-error .fatcat-toast-title, html.dark-mode .fatcat-toast-error .fatcat-toast-title { color: #ffffff; }

            body.dark-mode .fatcat-toast-warning, html.dark-mode .fatcat-toast-warning {
                background: rgba(28, 23, 13, 0.94);
                border-color: rgba(245, 158, 11, 0.6);
                color: #fef3c7;
            }
            body.dark-mode .fatcat-toast-warning .fatcat-toast-icon, html.dark-mode .fatcat-toast-warning .fatcat-toast-icon { color: #fbbf24; }
            body.dark-mode .fatcat-toast-warning .fatcat-toast-title, html.dark-mode .fatcat-toast-warning .fatcat-toast-title { color: #ffffff; }

            body.dark-mode .fatcat-toast-info, html.dark-mode .fatcat-toast-info {
                background: rgba(12, 22, 36, 0.94);
                border-color: rgba(2, 132, 199, 0.6);
                color: #e0f2fe;
            }
            body.dark-mode .fatcat-toast-info .fatcat-toast-icon, html.dark-mode .fatcat-toast-info .fatcat-toast-icon { color: #38bdf8; }
            body.dark-mode .fatcat-toast-info .fatcat-toast-title, html.dark-mode .fatcat-toast-info .fatcat-toast-title { color: #ffffff; }

            @media (max-width: 600px) {
                #fatcat-toast-container {
                    top: 14px;
                    right: 14px;
                    left: 14px;
                    width: auto;
                    max-width: none;
                }
                .fatcat-toast {
                    padding: 14px 16px;
                    font-size: 13.5px;
                    transform: translateY(-20px);
                }
                .fatcat-toast.toast-visible { transform: translateY(0); }
                .fatcat-toast.toast-hiding { transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
    }

    function ensureContainer() {
        ensureStyles();
        let container = document.getElementById(TOAST_CONTAINER_ID);
        if (!container) {
            container = document.createElement("div");
            container.id = TOAST_CONTAINER_ID;
            container.setAttribute("aria-live", "polite");
            container.setAttribute("aria-atomic", "true");
            document.body.appendChild(container);
        }
        return container;
    }

    function showNotification(message, type = "info", options = {}) {
        if (!message) return;

        const normalizedType = ["success", "error", "warning", "info"].includes(type) ? type : "info";
        const duration = typeof options.duration === "number" ? options.duration : DEFAULT_DURATION;
        const customTitle = options.title !== undefined ? options.title : TITLES[normalizedType];

        const container = ensureContainer();

        // Create Toast element
        const toast = document.createElement("div");
        toast.className = `fatcat-toast fatcat-toast-${normalizedType}`;
        toast.setAttribute("role", normalizedType === "error" ? "alert" : "status");

        const iconClass = ICONS[normalizedType] || ICONS.info;

        toast.innerHTML = `
            <div class="fatcat-toast-icon">
                <i class="${iconClass}" aria-hidden="true"></i>
            </div>
            <div class="fatcat-toast-content">
                ${customTitle ? `<div class="fatcat-toast-title">${escapeHtml(customTitle)}</div>` : ""}
                <div class="fatcat-toast-message">${escapeHtml(message)}</div>
            </div>
            <button type="button" class="fatcat-toast-close" aria-label="Close notification">&times;</button>
            <div class="fatcat-toast-progress"></div>
        `;

        container.appendChild(toast);

        // Force reflow and reveal toast smoothly
        toast.offsetHeight;
        toast.classList.add("toast-visible");

        const progressEl = toast.querySelector(".fatcat-toast-progress");
        const closeBtn = toast.querySelector(".fatcat-toast-close");

        let remainingTime = duration;
        let startTime = Date.now();
        let dismissTimer = null;

        function startDismissTimer() {
            if (progressEl) {
                progressEl.style.transitionDuration = `${remainingTime}ms`;
                progressEl.style.transform = "scaleX(0)";
            }
            startTime = Date.now();
            dismissTimer = setTimeout(() => {
                removeToast(toast);
            }, remainingTime);
        }

        function pauseDismissTimer() {
            if (dismissTimer) {
                clearTimeout(dismissTimer);
                dismissTimer = null;
            }
            const elapsed = Date.now() - startTime;
            remainingTime = Math.max(0, remainingTime - elapsed);
            if (progressEl) {
                const computed = window.getComputedStyle(progressEl).transform;
                progressEl.style.transition = "none";
                progressEl.style.transform = computed;
            }
        }

        startDismissTimer();

        // Pause on hover
        toast.addEventListener("mouseenter", pauseDismissTimer);
        toast.addEventListener("mouseleave", () => {
            if (remainingTime > 0) {
                if (progressEl) {
                    progressEl.style.transition = `transform linear ${remainingTime}ms`;
                    progressEl.style.transform = "scaleX(0)";
                }
                startDismissTimer();
            } else {
                removeToast(toast);
            }
        });

        // Close button click
        closeBtn.addEventListener("click", () => {
            if (dismissTimer) clearTimeout(dismissTimer);
            removeToast(toast);
        });

        return toast;
    }

    function removeToast(toast) {
        if (!toast || toast.dataset.removing === "true") return;
        toast.dataset.removing = "true";

        toast.classList.remove("toast-visible");
        toast.classList.add("toast-hiding");

        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 360);
    }

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // Expose globally
    window.showNotification = showNotification;
    window.fatcatToast = {
        show: showNotification,
        success: (msg, opts) => showNotification(msg, "success", opts),
        error: (msg, opts) => showNotification(msg, "error", opts),
        warning: (msg, opts) => showNotification(msg, "warning", opts),
        info: (msg, opts) => showNotification(msg, "info", opts)
    };
})();
