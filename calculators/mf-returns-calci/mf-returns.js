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

function calculateMF() {
  if (!investmentInput || !yearsSlider || !rateSlider) return;

  let P = parseFloat(investmentInput.value) || 0;
  let r = (parseFloat(rateSlider.value) || 0) / 100;
  let n = parseFloat(yearsSlider.value) || 0;

  let FV = P * Math.pow((1 + r), n);
  let returns = FV - P;

  if (yearValue) yearValue.innerText = yearsSlider.value;
  if (rateValue) rateValue.innerText = rateSlider.value;
  if (resultYears) resultYears.innerText = yearsSlider.value;

  if (totalValue) totalValue.innerText = Math.round(FV).toLocaleString("en-IN");
  if (investedAmount) investedAmount.innerText = Math.round(P).toLocaleString("en-IN");
  if (returnsAmount) returnsAmount.innerText = Math.round(returns).toLocaleString("en-IN");

  updateChart(P, returns);
}

function updateChart(invested, returns) {
  const chartCanvas = document.getElementById("mfChart");
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested", "Returns"],
      datasets: [{
        data: [invested, returns],
        backgroundColor: ["#1e8a98", "#555"]
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

if (yearsSlider) yearsSlider.addEventListener("input", calculateMF);
if (rateSlider) rateSlider.addEventListener("input", calculateMF);
if (investmentInput) investmentInput.addEventListener("input", calculateMF);

document.addEventListener("DOMContentLoaded", calculateMF);
calculateMF();