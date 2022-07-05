const inputYearlyBtn = document.querySelector("#yearly");
const inputMonthlyBtn = document.querySelector("#monthly");
const rangeEl = document.getElementById("range");
const toggleEl = document.querySelector(".toggle__control");
const outputPrice = document.querySelector("#price");
const outputTraffic = document.querySelector(".sub-details__traffic-value");
const discountEl = document.querySelector(".pricing__discount");

const priceValues = ["8.00", "12.00", "16.00", "24.00", "36.00"];
const trafficValues = ["10K", "50K", "100K", "500K", "1M"];

// Data from range is not processed, since there is no such task, and therefore not the values from 'prcieValues' are sent, but a fractional number. e.g price=2.86&subscription=monthly#

const changeDiscountText = () => {
  if (window.matchMedia("(max-width: 34.7em)").matches) {
    discountEl.textContent = "-25%";
  }
  if (window.matchMedia("(min-width: 35em)").matches) {
    discountEl.textContent = "25% discount";
  }
};

inputMonthlyBtn.onclick = () => {
  toggleEl.classList.remove("toggle__control--on");
  outputPrice.textContent = priceValues[Math.round(rangeEl.value)];
};

inputYearlyBtn.onclick = () => {
  toggleEl.classList.add("toggle__control--on");
  outputPrice.textContent = priceValues[Math.round(rangeEl.value)] / 1.25;
};

rangeEl.oninput = () => {
  let value =
    ((rangeEl.value - rangeEl.min) / (rangeEl.max - rangeEl.min)) * 100;
  rangeEl.style.background = `
  linear-gradient(to right,
    hsl(174, 77%, 80%) 0%,
    hsl(174, 77%, 80%) ${value}%,
    hsl(224, 65%, 95%) ${value}%,
    hsl(224, 65%, 95%) 100%) `;

  let index = Math.round(rangeEl.value);
  outputPrice.textContent = inputYearlyBtn.checked
    ? priceValues[index] / 1.25
    : priceValues[index];
  outputTraffic.textContent = trafficValues[index];
};

window.addEventListener("resize", changeDiscountText);

changeDiscountText();
