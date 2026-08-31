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

function calculateLumpsum() {
  if (!investmentInput || !yearsSlider || !rateSlider) return;

  const principal = Number(investmentInput.value) || 0;
  const years = Number(yearsSlider.value) || 0;
  const rate = (Number(rateSlider.value) || 0) / 100;

  /* FUTURE VALUE FORMULA */
  const futureValue = principal * Math.pow((1 + rate), years);
  const returns = futureValue - principal;

  /* UPDATE UI */
  if (yearValue) yearValue.innerText = years;
  if (rateValue) rateValue.innerText = rateSlider.value;
  if (resultYears) resultYears.innerText = years;

  if (totalValue) totalValue.innerText = Math.round(futureValue).toLocaleString("en-IN");
  if (investedAmount) investedAmount.innerText = Math.round(principal).toLocaleString("en-IN");
  if (returnsAmount) returnsAmount.innerText = Math.round(returns).toLocaleString("en-IN");

  /* UPDATE CHART */
  updateChart(principal, returns);
}

function updateChart(invested, returns) {
  const chartCanvas = document.getElementById("lumpsumChart");
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested Amount", "Estimated Returns"],
      datasets: [{
        data: [invested, returns],
        backgroundColor: ["#1e8aa0", "#555"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      cutout: "70%",
      plugins: { legend: { display: false } },
      animation: {
        duration: 900
      }
    }
  });
}

/* EVENTS */
if (investmentInput) investmentInput.addEventListener("input", calculateLumpsum);
if (yearsSlider) yearsSlider.addEventListener("input", calculateLumpsum);
if (rateSlider) rateSlider.addEventListener("input", calculateLumpsum);

document.addEventListener("DOMContentLoaded", calculateLumpsum);
calculateLumpsum();