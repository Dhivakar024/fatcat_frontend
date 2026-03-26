
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

navMenu.classList.toggle("active");

});


/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

dropbtn.addEventListener("click", () => {

dropdown.classList.toggle("open");

});

 
const reveals = document.querySelectorAll(".reveal")

window.addEventListener("scroll", () => {

reveals.forEach(el => {

const top = el.getBoundingClientRect().top
const height = window.innerHeight

if(top < height - 120){
el.classList.add("active")
}

})

})


const revealElements = document.querySelectorAll(".reveal-up");

function revealCards(){

const windowHeight = window.innerHeight;

revealElements.forEach(el => {

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 120){
el.classList.add("active");
}

});

}


window.addEventListener("scroll", revealCards);


