document.addEventListener("DOMContentLoaded", function () {
    const selectedJob = localStorage.getItem("selectedJob");
    const jobElement = document.getElementById("selectedJob");

    if (selectedJob) {
        if (jobElement) jobElement.textContent = selectedJob;
    } else {
        if (jobElement) jobElement.textContent = "General Application";
    }

    const careerForm = document.getElementById("careerForm");
    if (careerForm) {
        careerForm.addEventListener("submit", function (e) {
            e.preventDefault();

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

            const saveAndRedirect = (resumeDataUrl, resumeFileName, resumeFileType) => {
                const application = {
                    id: "app-" + Date.now(),
                    name: fullName,
                    email: email,
                    phone: phone,
                    location: location,
                    jobTitle: selectedJob || "General Application",
                    qualification: qualification,
                    experience: experience,
                    company: company,
                    designation: designation,
                    message: message,
                    resumeDataUrl: resumeDataUrl || "",
                    resumeFileName: resumeFileName || `${fullName.replace(/\s+/g, '_')}_Resume.pdf`,
                    resumeFileType: resumeFileType || "application/pdf",
                    date: new Date().toLocaleDateString()
                };

                try {
                    const existing = JSON.parse(localStorage.getItem("fatcat_candidate_applications") || "[]");
                    existing.unshift(application);
                    localStorage.setItem("fatcat_candidate_applications", JSON.stringify(existing));
                } catch (err) {}

                alert("Thank you! Your job application has been submitted successfully.");
                localStorage.removeItem("selectedJob");
                window.location.href = "./career.html";
            };

            if (file) {
                const reader = new FileReader();
                reader.onload = function (evt) {
                    saveAndRedirect(evt.target.result, file.name, file.type);
                };
                reader.readAsDataURL(file);
            } else {
                saveAndRedirect("", "", "");
            }
        });
    }
});

function cancelApplication() {
    localStorage.removeItem("selectedJob");
    window.location.href = "./career.html";
}