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

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


const tabs = document.querySelectorAll(".tab-btn");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach(tab => {

tab.addEventListener("click", () => {

tabs.forEach(btn => btn.classList.remove("active"));
contents.forEach(content => content.classList.remove("active"));

tab.classList.add("active");

document.getElementById(tab.dataset.tab).classList.add("active");

});

});

const reveals1 = document.querySelectorAll(".reveal");

function revealScroll(){

const trigger = window.innerHeight * 0.85;

reveals1.forEach(el=>{

const top = el.getBoundingClientRect().top;

if(top < trigger){
el.classList.add("active");
}

});

}

window.addEventListener("scroll", revealScroll);
revealScroll();


const categories = document.querySelectorAll(".mf-category");
const tableBody = document.getElementById("fundTableBody");

/* DATA */

const fundData = {

sip100: [

{
name:"Aditya Birla Sun Life PSU Equity Fund",
size:"₹5,531.87",
y1:"31.88%",
y3:"36.33%",
y5:"0.00%"
},

{
name:"Aditya Birla Sun Life PSU Equity Fund Direct Payout",
size:"₹5,531.87",
y1:"31.88%",
y3:"36.33%",
y5:"0.00%"
}

],

sip500: [

{
name:"ICICI Prudential Infrastructure Fund",
size:"₹6,989.56",
y1:"40.77%",
y3:"35.45%",
y5:"32.74%"
},

{
name:"ICICI Prudential Infrastructure Fund Direct",
size:"₹5,531.87",
y1:"31.88%",
y3:"36.33%",
y5:"32.73%"
}

],

high: [

{
name:"HDFC Midcap Opportunities Fund",
size:"₹9,100.45",
y1:"44.32%",
y3:"39.11%",
y5:"35.20%"
},

{
name:"SBI Small Cap Fund",
size:"₹8,553.12",
y1:"42.88%",
y3:"37.55%",
y5:"34.12%"
}

],

index: [

{
name:"UTI Nifty 50 Index Fund",
size:"₹3,421.45",
y1:"28.45%",
y3:"31.77%",
y5:"29.01%"
},

{
name:"HDFC Sensex Index Fund",
size:"₹2,980.66",
y1:"27.11%",
y3:"30.90%",
y5:"28.34%"
}

]

};

/* RENDER FUNCTION */

function renderTable(category){

tableBody.innerHTML="";

fundData[category].forEach(fund=>{

const row = `
<tr>
<td>${fund.name}</td>
<td>${fund.size}</td>
<td>${fund.y1}</td>
<td>${fund.y3}</td>
<td>${fund.y5}</td>
</tr>
`;

tableBody.innerHTML += row;

});

}

/* CLICK EVENT */

categories.forEach(btn=>{

btn.addEventListener("click",()=>{

categories.forEach(c=>c.classList.remove("active"));
btn.classList.add("active");

renderTable(btn.dataset.category);

});

});

/* INITIAL LOAD */

renderTable("sip100");


const cards = document.querySelectorAll(".mf-card");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

},{
threshold:0.2
});

cards.forEach(card=>{
observer.observe(card);
});

const observer1 = new IntersectionObserver((entries) => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

},{
threshold:0.2
});

const elements = document.querySelectorAll(
".scroll-animate, .fade-left, .fade-right"
);

elements.forEach(el => observer1.observe(el));


const reveals2 = document.querySelectorAll(".reveal");

const observer2 = new IntersectionObserver(entries => {
entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("active");
}

});
});

reveals2.forEach(el => observer2.observe(el));