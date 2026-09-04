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

window.addEventListener("scroll", revealOnScroll);


const heroContent = document.querySelector(".hero-content");

window.addEventListener("load", () => {
    if (heroContent) heroContent.classList.add("show");
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

function syncMapHeight() {
    if (window.innerWidth > 992) {
        const contactLeft = document.querySelector(".contact-left");
        const mapLabel = document.querySelector(".map-label");
        const iframe = document.querySelector(".contact-right iframe");
        if (contactLeft && mapLabel && iframe) {
            const leftHeight = contactLeft.offsetHeight;
            const labelStyle = window.getComputedStyle(mapLabel);
            const labelMarginBottom = parseFloat(labelStyle.marginBottom || 0);
            const labelHeight = mapLabel.offsetHeight + labelMarginBottom;
            const targetIframeHeight = leftHeight - labelHeight;
            if (targetIframeHeight > 250) {
                iframe.style.height = targetIframeHeight + "px";
            }
        }
    } else {
        const iframe = document.querySelector(".contact-right iframe");
        if (iframe) iframe.style.height = "";
    }
}

window.addEventListener("load", syncMapHeight);
window.addEventListener("resize", syncMapHeight);
document.addEventListener("DOMContentLoaded", syncMapHeight);
