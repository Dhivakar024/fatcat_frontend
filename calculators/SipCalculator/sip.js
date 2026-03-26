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

const ctx = document.getElementById("sipChart").getContext("2d");

let chart;

function calculateSip() {

  const monthlyInvestment = Number(investmentInput.value);
  const years = Number(yearsSlider.value);
  const annualRate = Number(rateSlider.value);

  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  // SIP Formula
  const futureValue = monthlyInvestment *
    ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
    (1 + monthlyRate);

  const invested = monthlyInvestment * months;
  const returns = futureValue - invested;

  // UI Updates
  yearValue.innerText = years;
  rateValue.innerText = annualRate;
  resultYears.innerText = years;

  totalValue.innerText = Math.round(futureValue).toLocaleString();
  investedAmount.innerText = invested.toLocaleString();
  returnsAmount.innerText = Math.round(returns).toLocaleString();

  updateChart(invested, returns);
}


function updateChart(invested,returns){

if(chart) chart.destroy();

chart = new Chart(ctx,{
type:"doughnut",
data:{
labels:["Invested","Returns"],
datasets:[{
data:[invested,returns],
backgroundColor:["#1e8aa0","#555"],
borderWidth:0
}]
},
options:{
cutout:"70%",
plugins:{legend:{display:false}}
}
});

}

investmentInput.addEventListener("input",calculateSip);
yearsSlider.addEventListener("input",calculateSip);
rateSlider.addEventListener("input",calculateSip);

calculateSip();
