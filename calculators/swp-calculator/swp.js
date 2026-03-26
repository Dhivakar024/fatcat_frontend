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
const withdrawSlider = document.getElementById("withdraw");
const rateSlider = document.getElementById("rate");
const yearsSlider = document.getElementById("years");

const withdrawValue = document.getElementById("withdrawValue");
const rateValue = document.getElementById("rateValue");
const yearValue = document.getElementById("yearValue");

const resultYears = document.getElementById("resultYears");

const remainingValue = document.getElementById("remainingValue");
const investedAmount = document.getElementById("investedAmount");
const withdrawnAmount = document.getElementById("withdrawnAmount");
const balanceAmount = document.getElementById("balanceAmount");

let chart;

function calculateSWP(){

let investment = parseFloat(investmentInput.value);
let withdraw = parseFloat(withdrawSlider.value);
let rate = parseFloat(rateSlider.value)/12/100;
let years = parseInt(yearsSlider.value);

let months = years*12;

let balance = investment;
let totalWithdrawn = 0;

for(let i=0;i<months;i++){

balance = balance*(1+rate);

if(balance>withdraw){
balance -= withdraw;
totalWithdrawn += withdraw;
}else{
totalWithdrawn += balance;
balance=0;
break;
}

}

remainingValue.innerText = Math.round(balance).toLocaleString();
investedAmount.innerText = investment.toLocaleString();
withdrawnAmount.innerText = Math.round(totalWithdrawn).toLocaleString();
balanceAmount.innerText = Math.round(balance).toLocaleString();

updateChart(investment,totalWithdrawn,balance);

}

function updateChart(invested,withdrawn,balance){

const ctx=document.getElementById("swpChart");

if(chart) chart.destroy();

chart=new Chart(ctx,{
type:"doughnut",
data:{
labels:["Investment","Withdrawn","Balance"],
datasets:[{
data:[invested,withdrawn,balance],
backgroundColor:["#1e8a98","#ff7a45","#555"]
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

withdrawSlider.oninput=()=>{
withdrawValue.innerText=withdrawSlider.value;
calculateSWP();
};

rateSlider.oninput=()=>{
rateValue.innerText=rateSlider.value;
calculateSWP();
};

yearsSlider.oninput=()=>{
yearValue.innerText=yearsSlider.value;
resultYears.innerText=yearsSlider.value;
calculateSWP();
};

investmentInput.oninput=calculateSWP;

calculateSWP();