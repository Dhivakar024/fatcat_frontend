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

function calculateSWP() {
  if (!investmentInput || !withdrawSlider || !rateSlider || !yearsSlider) return;

  let investment = parseFloat(investmentInput.value) || 0;
  let withdraw = parseFloat(withdrawSlider.value) || 0;
  let rate = (parseFloat(rateSlider.value) || 0) / 12 / 100;
  let years = parseInt(yearsSlider.value) || 0;

  let months = years * 12;

  let balance = investment;
  let totalWithdrawn = 0;

  for (let i = 0; i < months; i++) {
    balance = balance * (1 + rate);

    if (balance >= withdraw) {
      balance -= withdraw;
      totalWithdrawn += withdraw;
    } else {
      totalWithdrawn += balance;
      balance = 0;
      break;
    }
  }

  if (withdrawValue) withdrawValue.innerText = Number(withdrawSlider.value).toLocaleString("en-IN");
  if (rateValue) rateValue.innerText = rateSlider.value;
  if (yearValue) yearValue.innerText = yearsSlider.value;
  if (resultYears) resultYears.innerText = yearsSlider.value;

  if (remainingValue) remainingValue.innerText = Math.round(balance).toLocaleString("en-IN");
  if (investedAmount) investedAmount.innerText = Math.round(investment).toLocaleString("en-IN");
  if (withdrawnAmount) withdrawnAmount.innerText = Math.round(totalWithdrawn).toLocaleString("en-IN");
  if (balanceAmount) balanceAmount.innerText = Math.round(balance).toLocaleString("en-IN");

  updateChart(investment, totalWithdrawn, balance);
}

function updateChart(invested, withdrawn, balance) {
  const chartCanvas = document.getElementById("swpChart");
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Investment", "Withdrawn", "Balance"],
      datasets: [{
        data: [invested, withdrawn, balance],
        backgroundColor: ["#1e8a98", "#ff7a45", "#555"]
      }]
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: {
        legend: { display: false }
      }
    }
  });
}

if (withdrawSlider) withdrawSlider.addEventListener("input", calculateSWP);
if (rateSlider) rateSlider.addEventListener("input", calculateSWP);
if (yearsSlider) yearsSlider.addEventListener("input", calculateSWP);
if (investmentInput) investmentInput.addEventListener("input", calculateSWP);

document.addEventListener("DOMContentLoaded", calculateSWP);
calculateSWP();