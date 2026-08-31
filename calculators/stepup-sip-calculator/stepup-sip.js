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

function calculateStepUp() {
  if (!sipInput || !yearsSlider || !rateSlider || !stepupSlider) return;

  let sip = parseFloat(sipInput.value) || 0;
  let years = parseInt(yearsSlider.value) || 0;
  let rate = parseFloat(rateSlider.value) || 0;
  let stepup = parseFloat(stepupSlider.value) || 0;

  let monthlyRate = rate / 12 / 100;

  let totalValueCalc = 0;
  let totalInvested = 0;

  for (let y = 0; y < years; y++) {
    let yearlyMonthlySip = sip * Math.pow(1 + stepup / 100, y);
    let futureValue = 0;

    if (monthlyRate === 0) {
      futureValue = yearlyMonthlySip * 12;
    } else {
      let fv1Year = yearlyMonthlySip * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
      futureValue = fv1Year * Math.pow(1 + monthlyRate, (years - 1 - y) * 12);
    }

    totalValueCalc += futureValue;
    totalInvested += yearlyMonthlySip * 12;
  }

  let returns = totalValueCalc - totalInvested;

  if (yearValue) yearValue.innerText = yearsSlider.value;
  if (rateValue) rateValue.innerText = rateSlider.value;
  if (stepupValue) stepupValue.innerText = stepupSlider.value;
  if (resultYears) resultYears.innerText = yearsSlider.value;

  if (totalValue) totalValue.innerText = Math.round(totalValueCalc).toLocaleString("en-IN");
  if (investedAmount) investedAmount.innerText = Math.round(totalInvested).toLocaleString("en-IN");
  if (returnsAmount) returnsAmount.innerText = Math.round(returns).toLocaleString("en-IN");

  updateChart(totalInvested, returns);
}

function updateChart(invested, returns) {
  const chartCanvas = document.getElementById("stepupSipChart");
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested Amount", "Returns"],
      datasets: [{
        data: [invested, returns],
        backgroundColor: ["#1e8aa0", "#555"]
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

if (yearsSlider) yearsSlider.addEventListener("input", calculateStepUp);
if (rateSlider) rateSlider.addEventListener("input", calculateStepUp);
if (stepupSlider) stepupSlider.addEventListener("input", calculateStepUp);
if (sipInput) sipInput.addEventListener("input", calculateStepUp);

document.addEventListener("DOMContentLoaded", calculateStepUp);
calculateStepUp();