const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {

navMenu.classList.toggle("active");

});


const serviceDropdownLink = document.getElementById("servicesLink");

if(serviceDropdownLink){

    const serviceDropdown = serviceDropdownLink.closest(".dropdown");

    serviceDropdownLink.addEventListener("click", function(e){

        if(window.innerWidth <= 700){
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
const sipInput = document.getElementById("sipAmount");
const yearsSlider = document.getElementById("years");
const rateSlider = document.getElementById("rate");
const stepupSlider = document.getElementById("stepup");

const yearValue = document.getElementById("yearValue");
const rateValue = document.getElementById("rateValue");
const stepupValue = document.getElementById("stepupValue");

const resultYears = document.getElementById("resultYears");

const totalValue = document.getElementById("totalValue");
const investedAmount = document.getElementById("investedAmount");
const returnsAmount = document.getElementById("returnsAmount");

let chart;

function calculateStepUp(){

let sip = parseFloat(sipInput.value);
let years = parseInt(yearsSlider.value);
let rate = parseFloat(rateSlider.value);
let stepup = parseFloat(stepupSlider.value);

let monthlyRate = rate / 12 / 100;

let totalValueCalc = 0;
let totalInvested = 0;

for(let y=0; y<years; y++){

let yearlySip = sip * Math.pow((1 + stepup/100), y);

let futureValue = yearlySip * ((Math.pow(1+monthlyRate,12)-1)/monthlyRate)*(1+monthlyRate);

totalValueCalc += futureValue;

totalInvested += yearlySip * 12;

}

let returns = totalValueCalc-totalInvested;

totalValue.innerText = Math.round(totalValueCalc).toLocaleString();
investedAmount.innerText = Math.round(totalInvested).toLocaleString();
returnsAmount.innerText = Math.round(returns).toLocaleString();

updateChart(totalInvested,returns);

}

function updateChart(invested,returns){

if(chart) chart.destroy();

const ctx=document.getElementById("stepupSipChart");

chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Invested Amount","Returns"],
datasets:[{
data:[invested,returns],
backgroundColor:["#1e8aa0","#555"]
}]
},
options:{
responsive:true,
plugins:{
legend:{display:false}
}
}
});

}

yearsSlider.oninput=()=>{
yearValue.innerText=yearsSlider.value;
resultYears.innerText=yearsSlider.value;
calculateStepUp();
};

rateSlider.oninput=()=>{
rateValue.innerText=rateSlider.value;
calculateStepUp();
};

stepupSlider.oninput=()=>{
stepupValue.innerText=stepupSlider.value;
calculateStepUp();
};

sipInput.oninput=calculateStepUp;

calculateStepUp();