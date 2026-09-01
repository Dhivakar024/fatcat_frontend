const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if(hamburger && navMenu){

    hamburger.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    });

}


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

if(dropdown && dropbtn){

    dropbtn.addEventListener("click", () => {

    dropdown.classList.toggle("open");

    });

}


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
window.addEventListener("load", revealOnScroll);


// SCROLL ANIMATION (REUSABLE)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".fade-up").forEach((el) => {
  observer.observe(el);
});

const slider = document.getElementById("slider");

function slideLeft() {
  if(!slider) return;
  const cardWidth = document.querySelector(".amount-card").offsetWidth + 20;
  slider.scrollBy({
    left: -cardWidth,
    behavior: "smooth"
  });
}

function slideRight() {
  if(!slider) return;
  const cardWidth = document.querySelector(".amount-card").offsetWidth + 20;
  slider.scrollBy({
    left: cardWidth,
    behavior: "smooth"
  });
}