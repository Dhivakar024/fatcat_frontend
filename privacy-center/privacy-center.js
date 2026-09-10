document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("dpdpRequestModal");
    const modalTitle = document.getElementById("dpdpModalTitle");
    const modalSub = document.getElementById("dpdpModalSub");
    const closeBtn = document.getElementById("closeDpdpModalBtn");
    const cancelBtn = document.getElementById("cancelDpdpModalBtn");
    const requestForm = document.getElementById("dpdpRequestForm");
    const successScreen = document.getElementById("dpdpSuccessScreen");
    const trackingCodeEl = document.getElementById("dpdpTrackingCode");
    const doneBtn = document.getElementById("doneDpdpModalBtn");
    const openCookieSettingsBtn = document.getElementById("openCookieSettingsBtn");

    let activeRequestType = "Correct My Data";

    // Open Cookie Settings banner
    if (openCookieSettingsBtn) {
        openCookieSettingsBtn.addEventListener("click", function (e) {
            e.preventDefault();
            if (typeof window.openCookieConsent === "function") {
                window.openCookieConsent(true);
            } else {
                const cookieBanner = document.getElementById("cookieConsent");
                const prefPanel = document.getElementById("cookiePreferencesPanel");
                if (cookieBanner) cookieBanner.classList.add("active");
                if (prefPanel) prefPanel.classList.add("active");
            }
        });
    }

    // Open DPDP Modal matching Image 1
    function openModal(requestType = "Correct My Data", tagline = "Request correction of inaccurate data") {
        if (!modal) return;
        activeRequestType = requestType;

        if (modalTitle) {
            modalTitle.textContent = requestType;
        }
        if (modalSub) {
            modalSub.textContent = tagline;
        }
        if (requestForm) {
            requestForm.style.display = "block";
            requestForm.reset();
        }
        if (successScreen) {
            successScreen.style.display = "none";
        }
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Attach click handlers to all "Request" buttons
    document.querySelectorAll(".btn-request").forEach(btn => {
        btn.addEventListener("click", function () {
            const requestType = this.getAttribute("data-request-type") || "Correct My Data";
            const tagline = this.getAttribute("data-request-tagline") || "Request correction of inaccurate data";
            openModal(requestType, tagline);
        });
    });

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
    if (doneBtn) doneBtn.addEventListener("click", closeModal);

    if (modal) {
        modal.addEventListener("click", function (e) {
            if (e.target === modal) closeModal();
        });
    }

    window.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && modal && modal.classList.contains("active")) {
            closeModal();
        }
    });

    // Handle Form Submission (Image 1 fields)
    if (requestForm) {
        requestForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("principalName")?.value.trim() || "";
            const email = document.getElementById("principalEmail")?.value.trim() || "";
            const phone = document.getElementById("principalPhone")?.value.trim() || "";
            const details = document.getElementById("principalDetails")?.value.trim() || "";
            const declaration = document.getElementById("principalDeclaration")?.checked;

            if (!name || !email || !details || !declaration) {
                if (typeof showNotification === "function") {
                    showNotification("Please fill in all required fields and accept the agreement.", "warning");
                }
                return;
            }

            const timestamp = new Date();
            const randomCode = Math.floor(1000 + Math.random() * 9000);
            let trackingId = `DPDP-2026-${randomCode}`;

            const payload = {
                principalName: name,
                email: email,
                phone: phone || "N/A",
                requestType: activeRequestType,
                details: details,
                declaration: Boolean(declaration)
            };

            const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

            fetch(`${API_BASE}/privacy/requests`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            })
            .then(async res => {
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                    throw new Error(data.detail || "Unable to submit your privacy request. Please try again.");
                }
                if (data.tracking_id) {
                    trackingId = data.tracking_id;
                }
                if (typeof showNotification === "function") {
                    showNotification("Privacy request submitted successfully!", "success");
                }
            })
            .catch(err => {
                console.warn("Backend offline or request failed:", err);
                if (typeof showNotification === "function") {
                    showNotification("Unable to submit your privacy request. Please try again.", "error");
                }
            })
            .finally(() => {
                const newRequest = {
                    id: trackingId,
                    principalName: name,
                    email: email,
                    phone: phone || "N/A",
                    requestType: activeRequestType,
                    details: details,
                    status: "Pending",
                    createdAt: timestamp.toISOString(),
                    formattedDate: timestamp.toLocaleDateString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric"
                    })
                };

                try {
                    const existing = JSON.parse(localStorage.getItem("fatcat_dpdp_requests") || "[]");
                    existing.unshift(newRequest);
                    localStorage.setItem("fatcat_dpdp_requests", JSON.stringify(existing));
                    window.dispatchEvent(new CustomEvent("dpdpRequestAdded", { detail: newRequest }));
                } catch (err) {
                    console.error("Failed to store DPDP request:", err);
                }

                if (trackingCodeEl) {
                    trackingCodeEl.textContent = trackingId;
                }
                requestForm.style.display = "none";
                if (successScreen) {
                    successScreen.style.display = "block";
                }
            });
        });
    }
});
