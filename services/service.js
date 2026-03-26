const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

navMenu.classList.toggle("active");

});


const counters = document.querySelectorAll(".counter");

const startCounter = () => {

counters.forEach(counter => {

const target = +counter.getAttribute("data-target");
let count = 0;

const speed = target / 120;

function update(){

count += speed;

if(count < target){
counter.innerText = Math.ceil(count);
requestAnimationFrame(update);
}else{
counter.innerText = target;
}

}

update();

});

};

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



const observer = new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
startCounter();
}
});
});

observer.observe(document.querySelector(".stats-section"));

/* MOBILE DROPDOWN */

const dropdown = document.querySelector(".dropdown");
const dropbtn = document.querySelector(".dropbtn");

dropbtn.addEventListener("click", () => {

dropdown.classList.toggle("open");

});

const revealElements = document.querySelectorAll(".reveal-left, .reveal-right");

function revealOnScroll(){

const windowHeight = window.innerHeight;

revealElements.forEach(el => {

const elementTop = el.getBoundingClientRect().top;

if(elementTop < windowHeight - 100){
el.classList.add("active");
}

});

}

window.addEventListener("scroll", revealOnScroll);

const cards = document.querySelectorAll(".service-card");

function revealCards(){

    const trigger = window.innerHeight * 0.85;

    cards.forEach(card => {

        const top = card.getBoundingClientRect().top;

        if(top < trigger){
            card.classList.add("show");
        }

    });

}

window.addEventListener("scroll", revealCards);
revealCards();


const consultRows = document.querySelectorAll(".consult-row");

const observer1 = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});

consultRows.forEach(row => {
observer1.observe(row);
});

const elements = document.querySelectorAll(
".why-header, .why-image, .why-item"
);

const observer2 = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}   

});

},{ threshold:0.2 });

elements.forEach(el => observer2.observe(el));