const investmentInput = document.getElementById("investment");
const yearsSlider = document.getElementById("years");
const rateSlider = document.getElementById("rate");
const taxSlider = document.getElementById("tax");

const yearValue = document.getElementById("yearValue");
const rateValue = document.getElementById("rateValue");
const taxValue = document.getElementById("taxValue");

const totalValue = document.getElementById("totalValue");
const investedAmount = document.getElementById("investedAmount");
const returnsAmount = document.getElementById("returnsAmount");
const taxSaved = document.getElementById("taxSaved");

const resultYears = document.getElementById("resultYears");

let chart;

function calculateELSS() {
  if (!investmentInput || !yearsSlider || !rateSlider || !taxSlider) return;

  let P = parseFloat(investmentInput.value) || 0;
  let r = parseFloat(rateSlider.value) / 100;
  let n = parseFloat(yearsSlider.value) || 0;
  let tax = parseFloat(taxSlider.value) / 100;

  let FV = P * Math.pow((1 + r), n);
  let returns = FV - P;
  let taxBenefit = P * tax;

  if (yearValue) yearValue.innerText = yearsSlider.value;
  if (rateValue) rateValue.innerText = rateSlider.value;
  if (taxValue) taxValue.innerText = taxSlider.value;
  if (resultYears) resultYears.innerText = yearsSlider.value;

  if (totalValue) totalValue.innerText = Math.round(FV).toLocaleString("en-IN");
  if (investedAmount) investedAmount.innerText = Math.round(P).toLocaleString("en-IN");
  if (returnsAmount) returnsAmount.innerText = Math.round(returns).toLocaleString("en-IN");
  if (taxSaved) taxSaved.innerText = Math.round(taxBenefit).toLocaleString("en-IN");

  updateChart(P, returns, taxBenefit);
}

function updateChart(invested, returns, tax) {
  const chartCanvas = document.getElementById("elssChart");
  if (!chartCanvas) return;
  const ctx = chartCanvas.getContext("2d");

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested", "Returns", "Tax Saved"],
      datasets: [{
        data: [invested, returns, tax],
        backgroundColor: ["#1e8a98", "#555", "#ff7a45"]
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

if (yearsSlider) yearsSlider.addEventListener("input", calculateELSS);
if (rateSlider) rateSlider.addEventListener("input", calculateELSS);
if (taxSlider) taxSlider.addEventListener("input", calculateELSS);
if (investmentInput) investmentInput.addEventListener("input", calculateELSS);

document.addEventListener("DOMContentLoaded", calculateELSS);
calculateELSS();