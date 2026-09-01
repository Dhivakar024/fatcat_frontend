const investmentInput = document.getElementById("investment");
const yearsSlider = document.getElementById("years");
const rateSlider = document.getElementById("rate");

const yearValue = document.getElementById("yearValue");
const rateValue = document.getElementById("rateValue");
const resultYears = document.getElementById("resultYears");

const totalValue = document.getElementById("totalValue");
const investedAmount = document.getElementById("investedAmount");
const returnsAmount = document.getElementById("returnsAmount");

let chart;

function calculateSip() {
  if (!investmentInput || !yearsSlider || !rateSlider) return;

  const monthlyInvestment = Number(investmentInput.value) || 0;
  const years = Number(yearsSlider.value) || 0;
  const annualRate = Number(rateSlider.value) || 0;

  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  // SIP Formula
  let futureValue = 0;
  if (monthlyRate === 0) {
    futureValue = monthlyInvestment * months;
  } else {
    futureValue = monthlyInvestment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const invested = monthlyInvestment * months;
  const returns = futureValue - invested;

  // UI Updates
  if (yearValue) yearValue.innerText = years;
  if (rateValue) rateValue.innerText = annualRate;
  if (resultYears) resultYears.innerText = years;

  if (totalValue) totalValue.innerText = Math.round(futureValue).toLocaleString("en-IN");
  if (investedAmount) investedAmount.innerText = Math.round(invested).toLocaleString("en-IN");
  if (returnsAmount) returnsAmount.innerText = Math.round(returns).toLocaleString("en-IN");

  updateChart(invested, returns);
}

function updateChart(invested, returns) {
  const chartCanvas = document.getElementById("sipChart");
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested", "Returns"],
      datasets: [{
        data: [invested, returns],
        backgroundColor: ["#1e8aa0", "#555"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: { legend: { display: false } }
    }
  });
}

if (investmentInput) investmentInput.addEventListener("input", calculateSip);
if (yearsSlider) yearsSlider.addEventListener("input", calculateSip);
if (rateSlider) rateSlider.addEventListener("input", calculateSip);

document.addEventListener("DOMContentLoaded", calculateSip);
calculateSip();
