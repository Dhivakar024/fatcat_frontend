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


const elements = document.querySelectorAll(".scroll-animate");

function reveal(){
elements.forEach(el=>{
const top = el.getBoundingClientRect().top;
const windowHeight = window.innerHeight;

if(top < windowHeight - 100){
el.classList.add("active");
}
});
}

window.addEventListener("scroll",reveal);


const tabs = document.querySelectorAll(".tab-btn");
const grids = document.querySelectorAll(".features-grid");

tabs.forEach(tab=>{
  tab.addEventListener("click",()=>{

    tabs.forEach(btn=>btn.classList.remove("active"));
    tab.classList.add("active");

    grids.forEach(grid=>grid.classList.remove("active"));

    document.getElementById(tab.dataset.tab).classList.add("active");

  });
});

const cards = document.querySelectorAll(".stream-card");
const modal = document.getElementById("videoModal");
const iframe = document.getElementById("youtubeVideo");
const closeBtn = document.querySelector(".close-video");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const videoURL = card.getAttribute("data-video");
    iframe.src = videoURL + "?autoplay=1";
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = "";
});
