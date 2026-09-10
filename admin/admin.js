document.addEventListener("DOMContentLoaded", function () {
    // Auth elements
    const loginView = document.getElementById("adminLoginView");
    const appView = document.getElementById("adminAppView");
    const loginForm = document.getElementById("adminLoginForm");
    const loginEmailInput = document.getElementById("adminLoginEmail");
    const loginPasswordInput = document.getElementById("adminLoginPassword");
    const loginErrorAlert = document.getElementById("loginErrorMsg");
    const togglePasswordBtn = document.getElementById("togglePasswordBtn");
    const logoutBtn = document.getElementById("adminLogoutBtn");
    const userEmailDisplay = document.getElementById("adminUserEmailDisplay");

    // Clear login form inputs completely (no autofill or lingering values)
    function clearLoginForm() {
        if (loginEmailInput) {
            loginEmailInput.value = "";
            loginEmailInput.defaultValue = "";
        }
        if (loginPasswordInput) {
            loginPasswordInput.value = "";
            loginPasswordInput.defaultValue = "";
        }
        if (loginForm) {
            loginForm.reset();
        }
    }

    // Always ensure login inputs are completely blank on startup
    clearLoginForm();
    setTimeout(clearLoginForm, 50);
    window.addEventListener("pageshow", function () {
        const token = localStorage.getItem("fatcat_admin_token");
        const hasAuthFlag = localStorage.getItem("fatcat_admin_auth") === "true" || sessionStorage.getItem("fatcat_admin_auth") === "true";
        if (!token || !hasAuthFlag) {
            clearLoginForm();
        }
    });

    // Nav & Header
    const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
    const tabPanes = document.querySelectorAll(".tab-pane");
    const pageMainTitle = document.getElementById("pageMainTitle");
    const pageMainSubtitle = document.getElementById("pageMainSubtitle");

    // Privacy Requests elements
    const privacySearchInput = document.getElementById("privacySearchInput");
    const privacyStatusFilter = document.getElementById("privacyStatusFilter");
    const privacyEmptyState = document.getElementById("privacyEmptyState");
    const privacyTableContainer = document.getElementById("privacyTableContainer");
    const privacyTableBody = document.getElementById("privacyRequestsTableBody");
    const requestsCountText = document.getElementById("requestsCountText");
    const refreshRequestsBtn = document.getElementById("refreshRequestsBtn");
    const sidebarPrivacyCount = document.getElementById("sidebarPrivacyCount");
    const dashboardPrivacyCountDisplay = document.getElementById("dashboardPrivacyCountDisplay");

    // Jobs elements
    const adminJobsCardsContainer = document.getElementById("adminJobsCardsContainer");
    const jobsCountText = document.getElementById("jobsCountText");
    const dashboardJobsCountDisplay = document.getElementById("dashboardJobsCountDisplay");
    const jobsSearchInput = document.getElementById("jobsSearchInput");
    const refreshJobsBtn = document.getElementById("refreshJobsBtn");

    // Post Job Modal (Image 1)
    const postJobModal = document.getElementById("postJobModal");
    const closePostJobModalBtn = document.getElementById("closePostJobModalBtn");
    const cancelPostJobModalBtn = document.getElementById("cancelPostJobModalBtn");
    const postJobForm = document.getElementById("postJobForm");

    // Edit Job Modal (Image 1 edit variant)
    const editJobModal = document.getElementById("editJobModal");
    const closeEditJobModalBtn = document.getElementById("closeEditJobModalBtn");
    const cancelEditJobModalBtn = document.getElementById("cancelEditJobModalBtn");
    const editJobForm = document.getElementById("editJobForm");

    // View Job Details Modal (Image 2)
    const jobViewDetailsModal = document.getElementById("jobViewDetailsModal");
    const closeJobDetailModalBtn = document.getElementById("closeJobDetailModalBtn");
    const closeJobDetailFooterBtn = document.getElementById("closeJobDetailFooterBtn");
    const viewJobDetailTitle = document.getElementById("viewJobDetailTitle");
    const viewJobDetailType = document.getElementById("viewJobDetailType");
    const viewJobDetailLocation = document.getElementById("viewJobDetailLocation");
    const viewJobDetailDesc = document.getElementById("viewJobDetailDesc");

    // Candidates elements
    const candidateSearchInput = document.getElementById("candidateSearchInput");
    const candidateCardsContainer = document.getElementById("candidateCardsContainer");
    const applicationsEmptyState = document.getElementById("applicationsEmptyState");
    const candApplicationsCountText = document.getElementById("candApplicationsCountText");
    const dashboardApplicationsCountDisplay = document.getElementById("dashboardApplicationsCountDisplay");
    const sidebarApplicationsCount = document.getElementById("sidebarApplicationsCount");
    const refreshCandidatesBtn = document.getElementById("refreshCandidatesBtn");

    // Privacy Request Modal
    const reqModal = document.getElementById("requestDetailsModal");
    const reqModalTrackingId = document.getElementById("modalReqTrackingId");
    const reqModalContent = document.getElementById("reqModalContent");
    const closeReqModalBtn = document.getElementById("closeReqModalBtn");
    const closeReqModalFooterBtn = document.getElementById("closeReqModalFooterBtn");
    const deleteRequestBtn = document.getElementById("deleteRequestBtn");

    let currentSelectedRequestId = null;

    // Default FatCat Job Openings
    const defaultJobs = [
        {
            id: "job-1",
            title: "MBA Department Manager",
            location: "Chennai, Madurai",
            type: "Full Time",
            desc: "Responsible for planning, managing department operations, handling teams and improving business performance."
        },
        {
            id: "job-2",
            title: "UX/UI Designer",
            location: "Chennai, Madurai",
            type: "Full Time",
            desc: "Work with developers and stakeholders to design user-friendly interfaces and improve user experience through testing."
        },
        {
            id: "job-3",
            title: "AI/ML",
            location: "Salem Tamilnadu",
            type: "Full Time",
            desc: "Python developer"
        },
        {
            id: "job-4",
            title: "Java Developer",
            location: "Salem",
            type: "Full Time",
            desc: "frame work +build tool"
        }
    ];

    // Tab metadata dictionary
    const tabMetadata = {
        "dashboard": {
            title: "Dashboard Overview",
            subtitle: "Manage website content and dynamic database entries in real time"
        },
        "privacy-requests": {
            title: "DPDP Privacy Requests",
            subtitle: "Manage website content and dynamic database entries in real time"
        },
        "jobs": {
            title: "Jobs & Careers Management",
            subtitle: "Manage website content and dynamic database entries in real time"
        },
        "applications": {
            title: "Candidate Applications",
            subtitle: "Review submitted resumes and contact candidates"
        }
    };

    // Dark / Light Theme Toggle Logic
    const themeToggleBtn = document.getElementById("adminThemeToggleBtn");
    const themeToggleIcon = document.getElementById("adminThemeToggleIcon");

    function applyAdminTheme(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            if (themeToggleIcon) {
                themeToggleIcon.classList.remove("fa-moon");
                themeToggleIcon.classList.add("fa-sun");
            }
        } else {
            document.body.classList.remove("dark-mode");
            if (themeToggleIcon) {
                themeToggleIcon.classList.remove("fa-sun");
                themeToggleIcon.classList.add("fa-moon");
            }
        }
    }

    const savedTheme = localStorage.getItem("fatcat-theme");
    if (savedTheme === "dark") {
        applyAdminTheme(true);
    } else {
        applyAdminTheme(false);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function () {
            const isCurrentlyDark = document.body.classList.contains("dark-mode");
            const newDarkState = !isCurrentlyDark;
            localStorage.setItem("fatcat-theme", newDarkState ? "dark" : "light");
            applyAdminTheme(newDarkState);
        });
    }

    // Toggle Password Visibility
    if (togglePasswordBtn && loginPasswordInput) {
        togglePasswordBtn.addEventListener("click", function () {
            const isPass = loginPasswordInput.type === "password";
            loginPasswordInput.type = isPass ? "text" : "password";
            this.classList.toggle("fa-eye", !isPass);
            this.classList.toggle("fa-eye-slash", isPass);
        });
    }

    // AUTHENTICATION LOGIC
    function checkAuth() {
        const token = localStorage.getItem("fatcat_admin_token");
        const hasAuthFlag = localStorage.getItem("fatcat_admin_auth") === "true" || sessionStorage.getItem("fatcat_admin_auth") === "true";
        const isAuth = Boolean(token) && hasAuthFlag;
        const email = localStorage.getItem("fatcat_admin_email") || "fatcatwealthy@gmail.com";

        if (isAuth) {
            if (loginView) loginView.style.display = "none";
            if (appView) appView.style.display = "flex";
            if (userEmailDisplay) userEmailDisplay.textContent = email;
            
            const hash = window.location.hash.replace("#", "") || "dashboard";
            switchTab(hash);
            loadJobs();
            loadCandidateApplications();
            loadPrivacyRequests();
        } else {
            if (appView) appView.style.display = "none";
            if (loginView) loginView.style.display = "flex";
            clearLoginForm();
        }
    }

    const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

    function getAdminHeaders() {
        const token = localStorage.getItem("fatcat_admin_token");
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;
        return headers;
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = loginEmailInput ? loginEmailInput.value.trim() : "";
            const password = loginPasswordInput ? loginPasswordInput.value.trim() : "";

            if (!email || !password) {
                if (loginErrorAlert) {
                    loginErrorAlert.querySelector("span").textContent = "Please enter both email and password.";
                    loginErrorAlert.style.display = "flex";
                }
                return;
            }

            fetch(`${API_BASE}/admin/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })
            .then(async res => {
                const data = await res.json().catch(() => ({}));
                if (!res.ok) {
                    throw new Error(data.detail || "Invalid administrative credentials.");
                }
                localStorage.setItem("fatcat_admin_token", data.access_token);
                localStorage.setItem("fatcat_admin_auth", "true");
                localStorage.setItem("fatcat_admin_email", email);
                if (loginErrorAlert) loginErrorAlert.style.display = "none";
                clearLoginForm();
                checkAuth();
            })
            .catch(err => {
                if (loginPasswordInput) loginPasswordInput.value = "";
                if (loginErrorAlert) {
                    loginErrorAlert.querySelector("span").textContent = err.message || "Invalid administrative credentials.";
                    loginErrorAlert.style.display = "flex";
                }
            });
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            localStorage.removeItem("fatcat_admin_token");
            localStorage.removeItem("fatcat_admin_auth");
            localStorage.removeItem("fatcat_admin_email");
            sessionStorage.removeItem("fatcat_admin_auth");
            sessionStorage.removeItem("fatcat_admin_email");
            clearLoginForm();
            if (loginErrorAlert) loginErrorAlert.style.display = "none";
            checkAuth();
        });
    }

    // TAB SWITCHING
    function switchTab(tabId) {
        const meta = tabMetadata[tabId] || tabMetadata["dashboard"];
        const targetTab = tabMetadata[tabId] ? tabId : "dashboard";

        navItems.forEach(item => {
            item.classList.toggle("active", item.getAttribute("data-tab") === targetTab);
        });

        tabPanes.forEach(pane => {
            pane.classList.toggle("active", pane.id === `tab-${targetTab}`);
        });

        if (pageMainTitle) pageMainTitle.textContent = meta.title;

        if (pageMainSubtitle) {
            if (targetTab === "applications") {
                const apps = getStoredCandidateApplications();
                pageMainSubtitle.textContent = `Total ${apps.length} application${apps.length === 1 ? '' : 's'} received • Review submitted resumes and contact candidates`;
            } else {
                pageMainSubtitle.textContent = meta.subtitle;
            }
        }

        window.location.hash = targetTab;

        if (targetTab === "jobs") loadJobs();
        if (targetTab === "applications") loadCandidateApplications();
        if (targetTab === "privacy-requests") loadPrivacyRequests();
    }

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            const tabId = this.getAttribute("data-tab");
            if (tabId) switchTab(tabId);
        });
    });

    document.querySelectorAll("[data-switch-tab]").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("data-switch-tab");
            if (target) switchTab(target);
        });
    });


    // =========================================================
    // JOBS MANAGEMENT (Images 1 & 2)
    // =========================================================
    function getStoredJobs() {
        try {
            const stored = localStorage.getItem("fatcat_jobs_list");
            if (!stored) {
                localStorage.setItem("fatcat_jobs_list", JSON.stringify(defaultJobs));
                return defaultJobs;
            }
            return JSON.parse(stored);
        } catch (e) {
            return defaultJobs;
        }
    }

    function saveJobs(jobs) {
        try {
            localStorage.setItem("fatcat_jobs_list", JSON.stringify(jobs));
        } catch (e) {}
    }

    function loadJobs() {
        const searchTerm = (jobsSearchInput ? jobsSearchInput.value : "").trim().toLowerCase();

        const renderFiltered = (jobs) => {
            const count = jobs.length;
            if (jobsCountText) jobsCountText.textContent = `Total ${count} open position${count === 1 ? '' : 's'}`;
            if (dashboardJobsCountDisplay) dashboardJobsCountDisplay.textContent = count;

            const filtered = jobs.filter(j => {
                if (!searchTerm) return true;
                return (j.title && j.title.toLowerCase().includes(searchTerm)) || 
                       (j.location && j.location.toLowerCase().includes(searchTerm)) || 
                       (j.type && j.type.toLowerCase().includes(searchTerm)) || 
                       ((j.desc || j.description) && (j.desc || j.description).toLowerCase().includes(searchTerm));
            });

            if (adminJobsCardsContainer) {
                if (filtered.length === 0) {
                    adminJobsCardsContainer.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding: 40px; color:#94a3b8;">No open positions found.</div>`;
                } else {
                    adminJobsCardsContainer.innerHTML = filtered.map(j => `
                        <div class="admin-job-card" id="${j.id}">
                            <div class="job-card-top">
                                <div>
                                    <h3 class="job-card-title">${j.title}</h3>
                                    <div class="job-card-meta">
                                        <span><i class="fa-solid fa-location-dot"></i> ${j.location}</span>
                                        <span>&bull;</span>
                                        <span><i class="fa-regular fa-clock"></i> ${j.type}</span>
                                    </div>
                                </div>
                                <span class="job-badge">${j.type}</span>
                            </div>
                            <p class="job-card-desc">${j.desc || j.description || ""}</p>
                            <div class="job-card-bottom">
                                <button type="button" class="btn-job-action btn-view-job" onclick="viewJobDetails('${j.id}')"><i class="fa-regular fa-eye"></i> View Details</button>
                                <div class="job-action-buttons">
                                    <button type="button" class="btn-job-action" onclick="openEditJobModal('${j.id}')"><i class="fa-solid fa-pen"></i> Edit</button>
                                    <button type="button" class="btn-job-action btn-delete" onclick="deleteJob('${j.id}')"><i class="fa-regular fa-trash-can"></i> Delete</button>
                                </div>
                            </div>
                        </div>
                    `).join("");
                }
            }
        };

        const token = localStorage.getItem("fatcat_admin_token");
        if (!token) {
            renderFiltered(getStoredJobs());
            return;
        }

        fetch(`${API_BASE}/admin/jobs`, { headers: getAdminHeaders() })
            .then(async res => {
                if (res.status === 401) {
                    localStorage.removeItem("fatcat_admin_token");
                    localStorage.removeItem("fatcat_admin_auth");
                    checkAuth();
                    return;
                }
                if (res.ok) {
                    const jobs = await res.json();
                    saveJobs(jobs);
                    renderFiltered(jobs);
                } else {
                    renderFiltered(getStoredJobs());
                }
            })
            .catch(() => {
                renderFiltered(getStoredJobs());
            });
    }

    // View Job Details Modal
    window.viewJobDetails = function (jobId) {
        const jobs = getStoredJobs();
        const job = jobs.find(j => j.id === jobId);
        if (!job || !jobViewDetailsModal) return;

        if (viewJobDetailTitle) viewJobDetailTitle.textContent = job.title;
        if (viewJobDetailType) viewJobDetailType.textContent = job.type;
        if (viewJobDetailLocation) viewJobDetailLocation.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${job.location}`;
        if (viewJobDetailDesc) viewJobDetailDesc.textContent = job.desc || job.description || "";

        jobViewDetailsModal.classList.add("active");
    };

    function closeJobDetailModal() {
        if (jobViewDetailsModal) jobViewDetailsModal.classList.remove("active");
    }

    if (closeJobDetailModalBtn) closeJobDetailModalBtn.addEventListener("click", closeJobDetailModal);
    if (closeJobDetailFooterBtn) closeJobDetailFooterBtn.addEventListener("click", closeJobDetailModal);

    // Edit Job Opening Modal
    window.openEditJobModal = function (jobId) {
        const jobs = getStoredJobs();
        const job = jobs.find(j => j.id === jobId);
        if (!job || !editJobModal) return;

        document.getElementById("editJobId").value = job.id;
        document.getElementById("editJobTitle").value = job.title;
        document.getElementById("editJobLocation").value = job.location;
        document.getElementById("editJobType").value = job.type;
        document.getElementById("editJobDesc").value = job.desc || job.description || "";

        editJobModal.classList.add("active");
    };

    function closeEditJobModal() {
        if (editJobModal) editJobModal.classList.remove("active");
    }

    if (closeEditJobModalBtn) closeEditJobModalBtn.addEventListener("click", closeEditJobModal);
    if (cancelEditJobModalBtn) cancelEditJobModalBtn.addEventListener("click", closeEditJobModal);

    if (editJobForm) {
        editJobForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const jobId = document.getElementById("editJobId").value;
            const title = document.getElementById("editJobTitle").value.trim();
            const location = document.getElementById("editJobLocation").value.trim();
            const type = document.getElementById("editJobType").value;
            const desc = document.getElementById("editJobDesc").value.trim();

            if (!title || !location || !desc) {
                if (typeof showNotification === "function") {
                    showNotification("Please fill in all required job fields.", "warning");
                }
                return;
            }

            const updatedJob = { id: jobId, title, location, type, desc };

            fetch(`${API_BASE}/admin/jobs/${jobId}`, {
                method: "PUT",
                headers: getAdminHeaders(),
                body: JSON.stringify({ title, location, type, desc })
            })
            .then(async res => {
                if (!res.ok) {
                    throw new Error("Unable to update the job opening.");
                }
                let jobs = getStoredJobs();
                const index = jobs.findIndex(j => j.id === jobId);
                if (index !== -1) {
                    jobs[index] = updatedJob;
                    saveJobs(jobs);
                }
                if (typeof showNotification === "function") {
                    showNotification("Job opening updated successfully!", "success");
                }
            })
            .catch(err => {
                console.warn("Job update error:", err);
                let jobs = getStoredJobs();
                const index = jobs.findIndex(j => j.id === jobId);
                if (index !== -1) {
                    jobs[index] = updatedJob;
                    saveJobs(jobs);
                    if (typeof showNotification === "function") {
                        showNotification("Job opening updated successfully!", "success");
                    }
                } else {
                    if (typeof showNotification === "function") {
                        showNotification("Unable to update the job opening.", "error");
                    }
                }
            })
            .finally(() => {
                closeEditJobModal();
                loadJobs();
            });
        });
    }

    window.deleteJob = function (jobId) {
        if (confirm("Are you sure you want to delete this job opening?")) {
            fetch(`${API_BASE}/admin/jobs/${jobId}`, {
                method: "DELETE",
                headers: getAdminHeaders()
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Unable to delete the job opening.");
                }
                let jobs = getStoredJobs();
                jobs = jobs.filter(j => j.id !== jobId);
                saveJobs(jobs);
                loadJobs();
                if (typeof showNotification === "function") {
                    showNotification("Job opening deleted successfully!", "success");
                }
            })
            .catch(err => {
                console.warn("Job deletion error:", err);
                let jobs = getStoredJobs();
                jobs = jobs.filter(j => j.id !== jobId);
                saveJobs(jobs);
                loadJobs();
                if (typeof showNotification === "function") {
                    showNotification("Job opening deleted successfully!", "success");
                }
            });
        }
    };

    if (jobsSearchInput) {
        jobsSearchInput.addEventListener("input", loadJobs);
    }

    // Post New Job Modal
    function openPostJobModal() {
        if (postJobModal) postJobModal.classList.add("active");
    }

    function closePostJobModal() {
        if (postJobModal) postJobModal.classList.remove("active");
    }

    document.querySelectorAll(".open-post-job-modal").forEach(btn => {
        btn.addEventListener("click", openPostJobModal);
    });

    if (closePostJobModalBtn) closePostJobModalBtn.addEventListener("click", closePostJobModal);
    if (cancelPostJobModalBtn) cancelPostJobModalBtn.addEventListener("click", closePostJobModal);

    if (postJobForm) {
        postJobForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const title = document.getElementById("newJobTitle")?.value.trim();
            const location = document.getElementById("newJobLocation")?.value.trim();
            const type = document.getElementById("newJobType")?.value || "Full Time";
            const desc = document.getElementById("newJobDesc")?.value.trim();

            if (!title || !location || !desc) {
                if (typeof showNotification === "function") {
                    showNotification("Please fill in all required job details.", "warning");
                }
                return;
            }

            const newJob = {
                id: "job-" + Date.now(),
                title: title,
                location: location,
                type: type,
                desc: desc
            };

            fetch(`${API_BASE}/admin/jobs`, {
                method: "POST",
                headers: getAdminHeaders(),
                body: JSON.stringify({ title, location, type, desc })
            })
            .then(async res => {
                if (!res.ok) {
                    throw new Error("Unable to create the job opening.");
                }
                const created = await res.json().catch(() => newJob);
                const jobs = getStoredJobs();
                jobs.unshift(created);
                saveJobs(jobs);
                if (typeof showNotification === "function") {
                    showNotification("Job opening created successfully!", "success");
                }
            })
            .catch(err => {
                console.warn("Job create error:", err);
                const jobs = getStoredJobs();
                jobs.unshift(newJob);
                saveJobs(jobs);
                if (typeof showNotification === "function") {
                    showNotification("Job opening created successfully!", "success");
                }
            })
            .finally(() => {
                postJobForm.reset();
                closePostJobModal();
                loadJobs();
            });
        });
    }


    // =========================================================
    // CANDIDATE APPLICATIONS (Dynamic Real-Time Sync & Storage)
    // =========================================================
    function getStoredCandidateApplications() {
        try {
            return JSON.parse(localStorage.getItem("fatcat_candidate_applications") || "[]");
        } catch (e) {
            return [];
        }
    }

    function saveCandidateApplications(apps) {
        try {
            localStorage.setItem("fatcat_candidate_applications", JSON.stringify(apps));
        } catch (e) {}
    }

    function loadCandidateApplications() {
        const searchTerm = (candidateSearchInput ? candidateSearchInput.value : "").trim().toLowerCase();

        const renderFiltered = (apps) => {
            const count = apps.length;
            if (candApplicationsCountText) {
                candApplicationsCountText.textContent = `Total ${count} application${count === 1 ? '' : 's'} received`;
            }
            if (dashboardApplicationsCountDisplay) {
                dashboardApplicationsCountDisplay.textContent = count;
            }
            if (sidebarApplicationsCount) {
                sidebarApplicationsCount.textContent = count;
                sidebarApplicationsCount.style.display = count > 0 ? "inline-block" : "none";
            }

            const filtered = apps.filter(app => {
                if (!searchTerm) return true;
                return (app.name && app.name.toLowerCase().includes(searchTerm)) ||
                       (app.email && app.email.toLowerCase().includes(searchTerm)) ||
                       (app.phone && app.phone.toLowerCase().includes(searchTerm)) ||
                       (app.jobTitle && app.jobTitle.toLowerCase().includes(searchTerm)) ||
                       (app.location && app.location.toLowerCase().includes(searchTerm));
            });

            if (filtered.length === 0) {
                if (applicationsEmptyState) applicationsEmptyState.style.display = "flex";
                if (candidateCardsContainer) candidateCardsContainer.style.display = "none";
            } else {
                if (applicationsEmptyState) applicationsEmptyState.style.display = "none";
                if (candidateCardsContainer) {
                    candidateCardsContainer.style.display = "grid";
                    candidateCardsContainer.innerHTML = filtered.map(app => `
                        <div class="candidate-card" id="${app.id}">
                            <div class="cand-header">
                                <div>
                                    <h3 class="cand-name">${app.name}</h3>
                                    <span class="cand-applied-badge">Applied for: ${app.jobTitle}</span>
                                </div>
                                <span class="cand-date"><i class="fa-regular fa-calendar"></i> ${app.date}</span>
                            </div>
                            <div class="cand-body">
                                <div class="cand-info-item"><i class="fa-regular fa-envelope"></i> ${app.email}</div>
                                <div class="cand-info-item"><i class="fa-solid fa-phone"></i> ${app.phone}</div>
                                <div class="cand-info-item"><i class="fa-solid fa-location-dot"></i> ${app.location}</div>
                            </div>
                            <div class="cand-footer">
                                <button type="button" class="btn-cand-resume" onclick="downloadCandidateResume('${app.id}', '${app.name}', '${app.jobTitle}', '${app.resumeUrl || ''}')"><i class="fa-solid fa-file-arrow-down"></i> View Resume <i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                                <button type="button" class="btn-cand-delete" onclick="deleteCandidateById('${app.id}')"><i class="fa-regular fa-trash-can"></i> Delete</button>
                            </div>
                        </div>
                    `).join("");
                }
            }
        };

        const token = localStorage.getItem("fatcat_admin_token");
        if (!token) {
            renderFiltered(getStoredCandidateApplications());
            return;
        }

        fetch(`${API_BASE}/admin/applications`, { headers: getAdminHeaders() })
            .then(async res => {
                if (res.status === 401) {
                    localStorage.removeItem("fatcat_admin_token");
                    localStorage.removeItem("fatcat_admin_auth");
                    checkAuth();
                    return;
                }
                if (res.ok) {
                    const apps = await res.json();
                    saveCandidateApplications(apps);
                    renderFiltered(apps);
                } else {
                    renderFiltered(getStoredCandidateApplications());
                }
            })
            .catch(() => {
                renderFiltered(getStoredCandidateApplications());
            });
    }

    window.downloadCandidateResume = async function (appId, candidateName, jobTitle, resumeUrl) {
        const token = localStorage.getItem("fatcat_admin_token");
        const targetUrl = resumeUrl || `${API_BASE}/admin/applications/${appId}/resume`;

        if (token && targetUrl) {
            try {
                const res = await fetch(targetUrl, {
                    headers: { "Authorization": `Bearer ${token}` }
                });
                if (res.ok) {
                    const blob = await res.blob();
                    const contentDisposition = res.headers.get("content-disposition");
                    let filename = `Resume_${(candidateName || "Candidate").replace(/\s+/g, '_')}.pdf`;
                    if (contentDisposition && contentDisposition.includes("filename=")) {
                        const match = contentDisposition.match(/filename=["']?([^"';]+)["']?/);
                        if (match && match[1]) filename = match[1];
                    }
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                    return;
                }
            } catch (err) {
                console.warn("[FatCat Admin] Server resume download failed, falling back to local:", err);
            }
        }

        const apps = getStoredCandidateApplications();
        const app = apps.find(a => a.id === appId || a.name === candidateName) || {};

        // If candidate uploaded an actual file (PDF/DOCX) during application submission, download that exact file!
        if (app.resumeDataUrl) {
            const link = document.createElement("a");
            link.href = app.resumeDataUrl;
            link.download = app.resumeFileName || `Resume_${(candidateName || "Candidate").replace(/\s+/g, '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            return;
        }

        // Fallback: Generate full multi-field PDF resume containing all application fields
        const formattedName = (candidateName || app.name || "Candidate").replace(/\s+/g, '_');
        const fileName = `Resume_${formattedName}.pdf`;
        const dateStr = app.date || new Date().toLocaleDateString();
        const nameClean = (candidateName || app.name || "Candidate").replace(/[()]/g, '');
        const jobClean = (jobTitle || app.jobTitle || "Position").replace(/[()]/g, '');
        const qualClean = (app.qualification || "MBA / Bachelor Degree").replace(/[()]/g, '');
        const expClean = (app.experience || "Relevant Experience").replace(/[()]/g, '');
        const compClean = (app.company || "Not Specified").replace(/[()]/g, '');
        const desigClean = (app.designation || "Not Specified").replace(/[()]/g, '');
        const locClean = (app.location || "Salem, Tamil Nadu").replace(/[()]/g, '');
        const emailClean = (app.email || "Registered Email").replace(/[()]/g, '');
        const phoneClean = (app.phone || "Registered Phone").replace(/[()]/g, '');

        const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 650 >>
stream
BT
/F1 18 Tf
50 730 Td
(FATCAT WEALTHY - FULL CANDIDATE RESUME) Tj
0 -30 Td
/F1 12 Tf
(Applicant Full Name: ${nameClean}) Tj
0 -20 Td
(Applied Job Position: ${jobClean}) Tj
0 -20 Td
(Application Date: ${dateStr}) Tj
0 -20 Td
(Location / City: ${locClean}) Tj
0 -30 Td
/F1 14 Tf
(CONTACT INFORMATION:) Tj
0 -20 Td
/F1 12 Tf
(Email: ${emailClean}) Tj
0 -20 Td
(Phone: ${phoneClean}) Tj
0 -30 Td
/F1 14 Tf
(PROFESSIONAL QUALIFICATIONS & EXPERIENCE:) Tj
0 -20 Td
/F1 12 Tf
(Highest Qualification: ${qualClean}) Tj
0 -20 Td
(Total Experience: ${expClean}) Tj
0 -20 Td
(Current Company: ${compClean}) Tj
0 -20 Td
(Current Designation: ${desigClean}) Tj
0 -30 Td
/F1 14 Tf
(APPLICATION VERIFICATION:) Tj
0 -20 Td
/F1 12 Tf
(Submitted through FatCat Wealthy Careers Application Portal.) Tj
0 -20 Td
(Verified for Human Resources & Recruiting Evaluation.) Tj
0 -40 Td
(FatCat Wealthy HR & Recruiting Department) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000069 00000 n 
0000000132 00000 n 
0000000255 00000 n 
0000000328 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
980
%%EOF`;

        const blob = new Blob([pdfContent], { type: "application/pdf" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    window.deleteCandidateById = function (appId) {
        if (confirm("Are you sure you want to remove this candidate application?")) {
            fetch(`${API_BASE}/admin/applications/${appId}`, {
                method: "DELETE",
                headers: getAdminHeaders()
            })
            .catch(() => {})
            .finally(() => {
                let apps = getStoredCandidateApplications();
                apps = apps.filter(a => a.id !== appId);
                saveCandidateApplications(apps);
                loadCandidateApplications();
            });
        }
    };

    if (candidateSearchInput) {
        candidateSearchInput.addEventListener("input", loadCandidateApplications);
    }


    // =========================================================
    // DPDP PRIVACY REQUESTS
    // =========================================================
    function getStoredRequests() {
        try {
            return JSON.parse(localStorage.getItem("fatcat_dpdp_requests") || "[]");
        } catch (e) {
            return [];
        }
    }

    function saveRequests(requests) {
        try {
            localStorage.setItem("fatcat_dpdp_requests", JSON.stringify(requests));
        } catch (e) {}
    }

    function getStatusPillClass(status) {
        switch (status) {
            case "Pending": return "pending-pill";
            case "In Review": return "review-pill";
            case "Resolved": return "resolved-pill";
            default: return "pending-pill";
        }
    }

    function loadPrivacyRequests() {
        const searchTerm = (privacySearchInput ? privacySearchInput.value : "").trim().toLowerCase();
        const statusFilter = privacyStatusFilter ? privacyStatusFilter.value : "All";

        const renderFiltered = (allRequests) => {
            const totalCount = allRequests.length;
            if (requestsCountText) {
                requestsCountText.textContent = `Total ${totalCount} request${totalCount === 1 ? '' : 's'} received`;
            }
            if (sidebarPrivacyCount) {
                sidebarPrivacyCount.textContent = totalCount;
                sidebarPrivacyCount.style.display = totalCount > 0 ? "inline-block" : "none";
            }
            if (dashboardPrivacyCountDisplay) {
                dashboardPrivacyCountDisplay.textContent = totalCount;
            }

            const filteredRequests = allRequests.filter(req => {
                const matchesSearch = !searchTerm || 
                    (req.principalName && req.principalName.toLowerCase().includes(searchTerm)) ||
                    (req.email && req.email.toLowerCase().includes(searchTerm)) ||
                    (req.phone && req.phone.toLowerCase().includes(searchTerm)) ||
                    (req.requestType && req.requestType.toLowerCase().includes(searchTerm)) ||
                    (req.id && req.id.toLowerCase().includes(searchTerm)) ||
                    (req.details && req.details.toLowerCase().includes(searchTerm));

                const matchesStatus = statusFilter === "All" || req.status === statusFilter;

                return matchesSearch && matchesStatus;
            });

            if (filteredRequests.length === 0) {
                if (privacyEmptyState) privacyEmptyState.style.display = "flex";
                if (privacyTableContainer) privacyTableContainer.style.display = "none";
            } else {
                if (privacyEmptyState) privacyEmptyState.style.display = "none";
                if (privacyTableContainer) privacyTableContainer.style.display = "block";

                if (privacyTableBody) {
                    privacyTableBody.innerHTML = filteredRequests.map(req => {
                        return `
                            <tr>
                                <td><span class="req-id-tag">${req.id}</span></td>
                                <td>
                                    <strong>${req.principalName}</strong><br>
                                    <small style="color:#64748b;">${req.email} &bull; ${req.phone}</small>
                                </td>
                                <td><span class="req-type-pill">${req.requestType}</span></td>
                                <td><small>${req.formattedDate || req.createdAt}</small></td>
                                <td>
                                    <select class="status-dropdown status-pill ${getStatusPillClass(req.status)}" onchange="updateRequestStatus('${req.id}', this.value)" style="padding: 4px 8px; font-size: 11px;">
                                        <option value="Pending" ${req.status === 'Pending' ? 'selected' : ''}>Pending</option>
                                        <option value="In Review" ${req.status === 'In Review' ? 'selected' : ''}>In Review</option>
                                        <option value="Resolved" ${req.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" class="btn-view-details" onclick="openRequestDetails('${req.id}')">
                                        <i class="fa-regular fa-eye"></i> View
                                    </button>
                                </td>
                            </tr>
                        `;
                    }).join("");
                }
            }
        };

        const token = localStorage.getItem("fatcat_admin_token");
        if (!token) {
            renderFiltered(getStoredRequests());
            return;
        }

        fetch(`${API_BASE}/admin/privacy-requests`, { headers: getAdminHeaders() })
            .then(async res => {
                if (res.status === 401) {
                    localStorage.removeItem("fatcat_admin_token");
                    localStorage.removeItem("fatcat_admin_auth");
                    checkAuth();
                    return;
                }
                if (res.ok) {
                    const reqs = await res.json();
                    saveRequests(reqs);
                    renderFiltered(reqs);
                } else {
                    renderFiltered(getStoredRequests());
                }
            })
            .catch(() => {
                renderFiltered(getStoredRequests());
            });
    }

    window.updateRequestStatus = function (requestId, newStatus) {
        fetch(`${API_BASE}/admin/privacy-requests/${requestId}/status`, {
            method: "PATCH",
            headers: getAdminHeaders(),
            body: JSON.stringify({ status: newStatus })
        })
        .catch(() => {})
        .finally(() => {
            const requests = getStoredRequests();
            const index = requests.findIndex(r => r.id === requestId);
            if (index !== -1) {
                requests[index].status = newStatus;
                saveRequests(requests);
                loadPrivacyRequests();
            }
        });
    };

    window.openRequestDetails = function (requestId) {
        const requests = getStoredRequests();
        const req = requests.find(r => r.id === requestId);
        if (!req || !reqModal) return;

        currentSelectedRequestId = requestId;
        if (reqModalTrackingId) reqModalTrackingId.textContent = req.id;

        if (reqModalContent) {
            reqModalContent.innerHTML = `
                <div class="detail-row">
                    <span class="detail-label">Data Principal Name</span>
                    <div class="detail-value" style="font-size: 15px; font-weight: 600;">${req.principalName}</div>
                </div>
                <div class="detail-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                    <div>
                        <span class="detail-label">Email Address</span>
                        <div class="detail-value"><a href="mailto:${req.email}" style="color: #7c3aed; text-decoration: none;">${req.email}</a></div>
                    </div>
                    <div>
                        <span class="detail-label">Phone Number</span>
                        <div class="detail-value"><a href="tel:${req.phone}" style="color: #7c3aed; text-decoration: none;">${req.phone}</a></div>
                    </div>
                </div>
                <div class="detail-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                    <div>
                        <span class="detail-label">Request Type</span>
                        <div class="detail-value"><span class="req-type-pill">${req.requestType}</span></div>
                    </div>
                    <div>
                        <span class="detail-label">Date Submitted</span>
                        <div class="detail-value">${req.formattedDate || req.createdAt}</div>
                    </div>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Request Details / Specification</span>
                    <div class="detail-value" style="background: rgba(0, 0, 0, 0.04); border: 1px solid rgba(0, 0, 0, 0.08); border-radius: 8px; padding: 12px; white-space: pre-wrap;">${req.details}</div>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Current Status</span>
                    <div class="detail-value">
                        <select class="status-dropdown status-pill ${getStatusPillClass(req.status)}" onchange="updateRequestStatus('${req.id}', this.value)">
                            <option value="Pending" ${req.status === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="In Review" ${req.status === 'In Review' ? 'selected' : ''}>In Review</option>
                            <option value="Resolved" ${req.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                        </select>
                    </div>
                </div>
            `;
        }

        reqModal.classList.add("active");
    };

    function closeReqModal() {
        if (reqModal) reqModal.classList.remove("active");
        currentSelectedRequestId = null;
    }

    if (closeReqModalBtn) closeReqModalBtn.addEventListener("click", closeReqModal);
    if (closeReqModalFooterBtn) closeReqModalFooterBtn.addEventListener("click", closeReqModal);
    if (reqModal) {
        reqModal.addEventListener("click", function (e) {
            if (e.target === reqModal) closeReqModal();
        });
    }

    if (deleteRequestBtn) {
        deleteRequestBtn.addEventListener("click", function () {
            if (!currentSelectedRequestId) return;
            if (confirm("Are you sure you want to delete this record?")) {
                const reqId = currentSelectedRequestId;
                fetch(`${API_BASE}/admin/privacy-requests/${reqId}`, {
                    method: "DELETE",
                    headers: getAdminHeaders()
                })
                .catch(() => {})
                .finally(() => {
                    const requests = getStoredRequests().filter(r => r.id !== reqId);
                    saveRequests(requests);
                    closeReqModal();
                    loadPrivacyRequests();
                });
            }
        });
    }

    if (privacySearchInput) privacySearchInput.addEventListener("input", loadPrivacyRequests);
    if (privacyStatusFilter) privacyStatusFilter.addEventListener("change", loadPrivacyRequests);


    // REFRESH BUTTON HANDLERS FOR ALL TABS
    function attachRefreshHandler(btn, callback) {
        if (!btn) return;
        btn.addEventListener("click", function () {
            this.classList.add("spinning");
            if (typeof callback === "function") callback();
            setTimeout(() => this.classList.remove("spinning"), 600);
        });
    }

    attachRefreshHandler(refreshRequestsBtn, loadPrivacyRequests);
    attachRefreshHandler(refreshJobsBtn, loadJobs);
    attachRefreshHandler(refreshCandidatesBtn, loadCandidateApplications);


    // Real-time Storage & Focus Listeners across tabs & window switches
    function reloadAllAdminData() {
        loadJobs();
        loadCandidateApplications();
        loadPrivacyRequests();
    }

    window.addEventListener("storage", function (e) {
        reloadAllAdminData();
    });

    window.addEventListener("focus", reloadAllAdminData);
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) reloadAllAdminData();
    });

    window.addEventListener("dpdpRequestAdded", loadPrivacyRequests);
    window.addEventListener("candidateApplicationAdded", loadCandidateApplications);

    // Initialize
    checkAuth();
});
