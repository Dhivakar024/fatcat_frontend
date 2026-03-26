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



const investmentInput = document.getElementById("investment");
const yearsSlider = document.getElementById("years");
const rateSlider = document.getElementById("rate");

const yearValue = document.getElementById("yearValue");
const rateValue = document.getElementById("rateValue");
const resultYears = document.getElementById("resultYears");

const totalValue = document.getElementById("totalValue");
const investedAmount = document.getElementById("investedAmount");
const returnsAmount = document.getElementById("returnsAmount");

const ctx = document.getElementById("lumpsumChart").getContext("2d");

let chart;

function calculateLumpsum(){

const principal = Number(investmentInput.value);
const years = Number(yearsSlider.value);
const rate = Number(rateSlider.value) / 100;

/* FUTURE VALUE FORMULA */

const futureValue = principal * Math.pow((1 + rate), years);

const returns = futureValue - principal;

/* UPDATE UI */

yearValue.innerText = years;
rateValue.innerText = rateSlider.value;
resultYears.innerText = years;

totalValue.innerText = Math.round(futureValue).toLocaleString();

investedAmount.innerText = principal.toLocaleString();
returnsAmount.innerText = Math.round(returns).toLocaleString();

/* UPDATE CHART */

updateChart(principal, returns);

}

function updateChart(invested, returns){

if(chart) chart.destroy();

chart = new Chart(ctx,{

type:"doughnut",

data:{
labels:["Invested Amount","Estimated Returns"],
datasets:[{
data:[invested, returns],
backgroundColor:["#1e8aa0","#555"],
borderWidth:0
}]
},

options:{
cutout:"70%",
plugins:{legend:{display:false}},
animation:{
duration:900
}

}

});

}

/* EVENTS */

investmentInput.addEventListener("input", calculateLumpsum);
yearsSlider.addEventListener("input", calculateLumpsum);
rateSlider.addEventListener("input", calculateLumpsum);

calculateLumpsum();