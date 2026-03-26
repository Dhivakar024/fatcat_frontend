const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

navMenu.classList.toggle("active");

});


const serviceDropdownLink = document.getElementById("servicesLink");

if(serviceDropdownLink){

    const serviceDropdown = serviceDropdownLink.closest(".dropdown");

    serviceDropdownLink.addEventListener("click", function(e){

        if(window.innerWidth <= 900){
            e.preventDefault(); // stop routing
            serviceDropdown.classList.toggle("active");
        }

    });

}

/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

dropbtn.addEventListener("click", () => {

dropdown.classList.toggle("open");

});


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





// SCROLL REVEAL SYSTEM

function revealElements(){

const reveals = document.querySelectorAll(
".reveal, .reveal-left, .reveal-right, .reveal-zoom"
);

const windowHeight = window.innerHeight;

reveals.forEach(el => {

const elementTop = el.getBoundingClientRect().top;
const revealPoint = 120;

if(elementTop < windowHeight - revealPoint){
el.classList.add("active");
}

});

}

window.addEventListener("scroll", revealElements);
window.addEventListener("load", revealElements);

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("jobSearch");
const jobCards = document.querySelectorAll(".job-card");

const noResults = document.getElementById("noResults");
const careerLayout = document.querySelector(".career-container");

searchBtn.addEventListener("click", searchJobs);

searchInput.addEventListener("keyup", function(e){
if(e.key === "Enter"){
searchJobs();
}
});

function searchJobs(){

const query = searchInput.value.toLowerCase().trim();

let firstMatch = null;
let found = false;

jobCards.forEach(card => {

const title = (card.dataset.title || "").toLowerCase();
const location = (card.dataset.location || "").toLowerCase();
const keywords = (card.dataset.keywords || "").toLowerCase();

const searchable = title + " " + location + " " + keywords;

if(searchable.includes(query)){

card.style.display = "";
found = true;

if(!firstMatch){
firstMatch = card;
}

}else{

card.style.display = "none";

}

});


/* HANDLE RESULT UI */

if(found){

careerLayout.style.display = "grid";
noResults.style.display = "none";



}else{

careerLayout.style.display = "none";
noResults.style.display = "block";

}


/* Scroll to first result */

if(firstMatch){

firstMatch.scrollIntoView({
behavior:"smooth",
block:"center"
});

firstMatch.click();

}

}


const jobCards2 = document.querySelectorAll(".job-card");

const jobTitle = document.getElementById("jobTitle");
const jobMeta = document.getElementById("jobMeta");
const jobDescription = document.getElementById("jobDescription");
const jobSpecs = document.getElementById("jobSpecs");

jobCards2.forEach(card => {

card.addEventListener("click", function(){

// remove active class
jobCards2.forEach(c => c.classList.remove("active"));

this.classList.add("active");

// get data
const title = this.dataset.title;
const level = this.dataset.level;
const location = this.dataset.location;
const description = this.dataset.description;
const specs = this.dataset.specs;

// update right panel
jobTitle.textContent = title;
jobMeta.textContent = level + " | " + location;
jobDescription.textContent = description;
jobSpecs.textContent = specs;

});

});



document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("jobSearch");
    const experienceFilter = document.getElementById("experienceFilter");
    const locationFilter = document.getElementById("locationFilter");
    const categoryFilter = document.getElementById("categoryFilter");

    const jobCards = document.querySelectorAll(".job-card");
    const noResult = document.getElementById("noResults");

    // 🔥 normalize text (fix UX/UI, CAD - etc)
    function normalize(text) {
        return text.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    }

    function filterJobs() {

        const searchValue = normalize(searchInput.value);
        const expValue = experienceFilter.value.toLowerCase();
        const locValue = locationFilter.value.toLowerCase();
        const catValue = categoryFilter.value.toLowerCase();

        let found = false;

        jobCards.forEach(card => {

            // 🔥 search from full card content (BEST)
            const fullText = normalize(card.innerText);

            const level = card.dataset.level.toLowerCase();
            const location = card.dataset.location.toLowerCase();

            // ✅ search match
            const matchSearch = fullText.includes(searchValue);

            // ✅ experience match
            const matchExp =
                expValue === "all" ||
                (expValue === "entry" && level.includes("entry")) ||
                (expValue === "mid" && level.includes("mid")) ||
                (expValue === "senior" && level.includes("senior"));

            // ✅ location match
            const matchLoc =
                locValue === "all" ||
                location.includes(locValue);

            // ⚠️ category (skip for now since not in your data)
            const matchCat = catValue === "all";

            if (matchSearch && matchExp && matchLoc && matchCat) {
                card.style.display = "flex"; // IMPORTANT
                found = true;
            } else {
                card.style.display = "none";
            }

        });

        noResult.style.display = found ? "none" : "block";
    }

    // 🔥 EVENTS (LIVE FILTER)
    searchInput.addEventListener("input", filterJobs);
    experienceFilter.addEventListener("change", filterJobs);
    locationFilter.addEventListener("change", filterJobs);
    categoryFilter.addEventListener("change", filterJobs);

});


