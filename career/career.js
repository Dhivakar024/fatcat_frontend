document.addEventListener("DOMContentLoaded", function () {

    // ── Scroll Reveal ──
    function revealElements() {
        const reveals = document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right, .reveal-zoom"
        );
        const windowHeight = window.innerHeight;
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 120) {
                el.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", revealElements);
    window.addEventListener("load", revealElements);
    revealElements(); // run once on load

    const jobTitle = document.getElementById("jobTitle");
    const jobMeta = document.getElementById("jobMeta");
    const jobDescription = document.getElementById("jobDescription");
    const jobSpecs = document.getElementById("jobSpecs");

    function attachCardClickListener(card) {
        card.addEventListener("click", function () {
            document.querySelectorAll(".job-card").forEach(c => c.classList.remove("active"));
            this.classList.add("active");

            if (jobTitle) jobTitle.textContent = this.dataset.title || "";
            if (jobMeta) jobMeta.textContent = (this.dataset.level || "") + " | " + (this.dataset.location || "");
            if (jobDescription) jobDescription.textContent = this.dataset.description || "";
            if (jobSpecs) jobSpecs.textContent = this.dataset.specs || "";
        });
    }

    document.querySelectorAll(".job-card").forEach(attachCardClickListener);

    // Fetch live jobs from backend
    const API_BASE = (window.FATCAT_API && window.FATCAT_API.BASE_URL) || "https://fatcat-backend.onrender.com/api";

    const jobListContainer = document.querySelector(".job-list");
    if (jobListContainer) {
        fetch(`${API_BASE}/jobs`)
            .then(async res => {
                if (res.ok) {
                    const jobs = await res.json();
                    if (Array.isArray(jobs) && jobs.length > 0) {
                        jobListContainer.innerHTML = jobs.map((j, idx) => `
                            <div class="job-card ${idx === 0 ? 'active' : ''}"
                                data-title="${j.title}"
                                data-level="${j.level || 'Mid-Level'}"
                                data-location="${j.location}"
                                data-description="${j.desc || j.description || ''}"
                                data-specs="${j.specs || ''}">
                                <h3>${j.title}</h3>
                                <p>${j.level || 'Mid-Level'} ${j.location}</p>
                            </div>
                        `).join("");

                        document.querySelectorAll(".job-card").forEach(attachCardClickListener);

                        // Set first job details
                        const firstJob = jobs[0];
                        if (jobTitle) jobTitle.textContent = firstJob.title || "";
                        if (jobMeta) jobMeta.textContent = (firstJob.level || "Mid-Level") + " | " + (firstJob.location || "");
                        if (jobDescription) jobDescription.textContent = firstJob.desc || firstJob.description || "";
                        if (jobSpecs) jobSpecs.textContent = firstJob.specs || "";
                    }
                }
            })
            .catch(() => {
                // Keep static HTML jobs if backend offline
            });
    }

    // ── Hero search button ──
    const searchBtn = document.getElementById("searchBtn");
    const searchHeroInput = document.getElementById("jobSearch");

    if (searchBtn && searchHeroInput) {
        searchBtn.addEventListener("click", function () {
            const q = searchHeroInput.value.toLowerCase().trim();
            filterJobsBy(q, "all", "all", "all");
        });
        searchHeroInput.addEventListener("keyup", function (e) {
            if (e.key === "Enter") {
                const q = searchHeroInput.value.toLowerCase().trim();
                filterJobsBy(q, "all", "all", "all");
            }
        });
    }

    // ── Filter section ──
    const filterSearchInput = document.querySelector(".job-search-input");
    const experienceFilter = document.getElementById("experienceFilter");
    const locationFilter = document.getElementById("locationFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    function normalize(text) {
        return text.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    }

    function filterJobsBy(search, exp, loc, cat) {
        const noResults = document.getElementById("noResults");
        const careerLayout = document.querySelector(".career-container");
        const cards = document.querySelectorAll(".job-card");
        let found = false;

        cards.forEach(card => {
            const fullText = normalize(card.innerText);
            const level = (card.dataset.level || "").toLowerCase();
            const location = (card.dataset.location || "").toLowerCase();

            const matchSearch = !search || fullText.includes(normalize(search));
            const matchExp =
                exp === "all" ||
                (exp === "entry" && level.includes("entry")) ||
                (exp === "mid" && level.includes("mid")) ||
                (exp === "senior" && level.includes("senior"));
            const matchLoc = loc === "all" || location.includes(loc);
            const matchCat = cat === "all"; // category not in data yet

            if (matchSearch && matchExp && matchLoc && matchCat) {
                card.style.display = "flex";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) noResults.style.display = found ? "none" : "block";
        if (careerLayout) careerLayout.style.display = found ? "grid" : "none";
    }

    function runFilter() {
        filterJobsBy(
            filterSearchInput ? filterSearchInput.value : "",
            experienceFilter ? experienceFilter.value : "all",
            locationFilter ? locationFilter.value : "all",
            categoryFilter ? categoryFilter.value : "all"
        );
    }

    if (filterSearchInput) filterSearchInput.addEventListener("input", runFilter);
    if (experienceFilter) experienceFilter.addEventListener("change", runFilter);
    if (locationFilter) locationFilter.addEventListener("change", runFilter);
    if (categoryFilter) categoryFilter.addEventListener("change", runFilter);

});

// ── Apply for Job (called from inline onclick) ──
function applyForJob() {
    const titleEl = document.getElementById("jobTitle");
    const jobTitleText = titleEl ? titleEl.innerText.trim() : "";
    localStorage.setItem("selectedJob", jobTitleText);
    window.location.href = "career-application.html";
}