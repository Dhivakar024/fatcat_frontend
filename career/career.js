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

    // ── Job Cards: click to show details ──
    const jobCards = document.querySelectorAll(".job-card");
    const jobTitle = document.getElementById("jobTitle");
    const jobMeta = document.getElementById("jobMeta");
    const jobDescription = document.getElementById("jobDescription");
    const jobSpecs = document.getElementById("jobSpecs");

    jobCards.forEach(card => {
        card.addEventListener("click", function () {
            jobCards.forEach(c => c.classList.remove("active"));
            this.classList.add("active");

            if (jobTitle) jobTitle.textContent = this.dataset.title || "";
            if (jobMeta) jobMeta.textContent = (this.dataset.level || "") + " | " + (this.dataset.location || "");
            if (jobDescription) jobDescription.textContent = this.dataset.description || "";
            if (jobSpecs) jobSpecs.textContent = this.dataset.specs || "";
        });
    });

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