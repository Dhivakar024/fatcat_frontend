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

const totalValue = document.getElementById("totalValue");
const investedAmount = document.getElementById("investedAmount");
const returnsAmount = document.getElementById("returnsAmount");

const resultYears = document.getElementById("resultYears");

let chart;

function calculateMF(){

let P = parseFloat(investmentInput.value);
let r = parseFloat(rateSlider.value)/100;
let n = parseFloat(yearsSlider.value);

let FV = P * Math.pow((1+r), n);
let returns = FV - P;

totalValue.innerText = Math.round(FV).toLocaleString();
investedAmount.innerText = P.toLocaleString();
returnsAmount.innerText = Math.round(returns).toLocaleString();

updateChart(P,returns);

}

function updateChart(invested,returns){

const ctx=document.getElementById("mfChart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Invested","Returns"],
datasets:[{
data:[invested,returns],
backgroundColor:["#1e8a98","#555"]
}]
},
options:{
responsive:true,
cutout:"70%",
plugins:{
legend:{display:false}
}
}
});

}

yearsSlider.oninput=()=>{
yearValue.innerText=yearsSlider.value;
resultYears.innerText=yearsSlider.value;
calculateMF();
};

rateSlider.oninput=()=>{
rateValue.innerText=rateSlider.value;
calculateMF();
};

investmentInput.oninput=calculateMF;

calculateMF();