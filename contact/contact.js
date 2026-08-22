const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

navMenu.classList.toggle("active");
hamburger.classList.toggle("active");

});


/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

dropbtn.addEventListener("click", (event) => {

if (window.innerWidth <= 900) {
    event.preventDefault();
    dropdown.classList.toggle("open");
}

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


const heroContent = document.querySelector(".hero-content");

window.addEventListener("load", () => {
    heroContent.classList.add("show");
});

ScrollReveal().reveal('.hero-title', {
    delay:200,
    distance:'40px',
    origin:'bottom',
    duration:1000
});

ScrollReveal().reveal('.hero-subtitle', {
    delay:400,
    distance:'40px',
    origin:'bottom',
    duration:1000
});
