console.log("[FatCat Career] career-application.js loaded");

// Helper function to safely call showNotification across all environments
const showNotification = (message, type = "info", options = {}) => {
    if (typeof window.showNotification === "function" && window.showNotification !== showNotification) {
        return window.showNotification(message, type, options);
    }
    if (window.fatcatToast && typeof window.fatcatToast.show === "function") {
        return window.fatcatToast.show(message, type, options);
    }
    alert(message);
};

// Document-level capture phase: prevents browser navigation/page reload immediately
document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "careerForm") {
        e.preventDefault();
        console.log("[FatCat Career] submit event fired (document capture)");
    }
}, true);

function setupCareerForm() {
    const selectedJob = localStorage.getItem("selectedJob");
    const jobElement = document.getElementById("selectedJob");

    if (jobElement) {
        jobElement.textContent = selectedJob || "General Application";
    }

    const careerForm = document.getElementById("careerForm");
    if (!careerForm) {
        console.warn("[FatCat Career] careerForm not found in DOM yet.");
        return;
    }

    if (careerForm.dataset.fatcatBound === "true") {
        return;
    }
    careerForm.dataset.fatcatBound = "true";
    console.log("[FatCat Career] form found");

    careerForm.addEventListener("submit", async function (e) {
        // Intercept submit event with preventDefault() as the very first operation
        e.preventDefault();
        e.stopPropagation();

        console.log("[FatCat Career] submit event fired");

        const submitBtn = careerForm.querySelector('button[type="submit"], .submit-btn');
        const originalText = submitBtn ? submitBtn.textContent.trim() : "Submit Application";
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting Application...";
        }

        try {
            const fullName = document.getElementById("fullName")?.value.trim() || "";
            const email = document.getElementById("email")?.value.trim() || "";
            const phone = document.getElementById("phone")?.value.trim() || "";
            const location = document.getElementById("location")?.value.trim() || "Salem, Tamil Nadu";
            const qualification = document.getElementById("qualification")?.value.trim() || "";
            const experience = document.getElementById("experience")?.value.trim() || "";
            const company = document.getElementById("company")?.value.trim() || "";
            const designation = document.getElementById("designation")?.value.trim() || "";
            const message = document.getElementById("message")?.value.trim() || "";
            const resumeInput = document.getElementById("resume");
            const file = resumeInput && resumeInput.files ? resumeInput.files[0] : null;

            if (!fullName || !email || !phone || !qualification || !experience || !file) {
                showNotification("Please fill in all required fields and upload your resume.", "warning");
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
                return;
            }

            const currentJob = (selectedJob || (jobElement ? jobElement.textContent.trim() : "General Application"));

            // Construct multipart FormData payload directly without blocking FileReader
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("phone", phone);
            formData.append("location", location);
            formData.append("jobTitle", currentJob);
            formData.append("qualification", qualification);
            formData.append("experience", experience);
            formData.append("company", company);
            formData.append("designation", designation);
            formData.append("message", message);
            if (file) {
                formData.append("resume", file);
            }

            // Store lightweight backup in localStorage without blocking or quota overflow
            try {
                const existing = JSON.parse(localStorage.getItem("fatcat_candidate_applications") || "[]");
                existing.unshift({
                    id: "app-" + Date.now(),
                    name: fullName,
                    email: email,
                    phone: phone,
                    location: location,
                    jobTitle: currentJob,
                    qualification: qualification,
                    experience: experience,
                    company: company,
                    designation: designation,
                    message: message,
                    resumeFileName: file.name,
                    date: new Date().toLocaleDateString()
                });
                localStorage.setItem("fatcat_candidate_applications", JSON.stringify(existing.slice(0, 50)));
            } catch (err) {
                // Ignore localStorage quota exception
            }

            const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

            console.log(`[FatCat Career] Sending POST request to ${API_BASE}/careers/apply`);

            const res = await fetch(`${API_BASE}/careers/apply`, {
                method: "POST",
                body: formData
            });

            console.log("[FatCat Career] API response status:", res.status);

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.detail || "Unable to submit your application. Please try again.");
            }

            console.log("[FatCat Career] application submitted successfully");

            // On successful response, ALWAYS call showNotification
            showNotification("Job application submitted successfully!", "success");

            // Reset the form only after successful submission
            careerForm.reset();

            // Restore the selected job title display if it was loaded
            if (jobElement && selectedJob) {
                jobElement.textContent = selectedJob;
            }

        } catch (err) {
            console.error("[FatCat Career] Application submission error:", err);
            showNotification(err.message || "Unable to submit your application. Please try again.", "error");
        } finally {
            // Restore submit button text and re-enable it
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });
}

// Ensure binding regardless of timing (works immediately, on DOMContentLoaded, and on load)
setupCareerForm();
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupCareerForm);
}
window.addEventListener("load", setupCareerForm);

function cancelApplication() {
    localStorage.removeItem("selectedJob");
    window.location.href = "./career.html";
}