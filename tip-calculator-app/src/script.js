"use strict";

const tipCalcBox = document.querySelector(".tip-calculator");
const inputBoxes = document.querySelectorAll(".input-box");
const inputBillEl = document.getElementById("bill");
const inputPeopleEl = document.getElementById("people");
const tipResult = document.getElementById("tip-value");
const totalResult = document.getElementById("total-value");
const calcBtnsBox = document.querySelector(".select-tip__buttons");
const calcBtns = Array.from(document.querySelectorAll(".select-tip__btn"));
const calcInputsEl = document.querySelectorAll(".calc-input");
const resetBtn = document.querySelector(".display__btn");
const customCalcBtn = document.querySelector(".input--custom");

let tip;

const calcTip = function (bill, tip, people) {
  const tipPerPerson = ((bill * (tip / 100)) / people).toFixed(2);
  const totalPerPerson = (
    (bill * (tip / 100)) / people +
    bill / people
  ).toFixed(2);
  return {
    tip: tipPerPerson,
    total: totalPerPerson,
  };
};

const render = function (calcTip) {
  tipResult.innerText = calcTip.tip;
  totalResult.innerText = calcTip.total;
  resetBtn.classList.add("display__btn--active");
};

const reset = function () {
  inputBillEl.value = "";
  inputPeopleEl.value = "";
  tipResult.innerText = "0.00";
  totalResult.innerText = "0.00";
  resetBtn.classList.remove("display__btn--active");
  calcBtns.forEach((el) => el.classList.remove("select-tip__btn--active"));
  customCalcBtn.value = "";
  inputBoxes.forEach((el) => el.classList.remove("input-box--required"));
  tip = 0;
};

const isEmptyInputs = function () {
  calcInputsEl.forEach((el) => {
    if (el.value === "" || el.value === "0") {
      el.closest(".input-box").classList.add("input-box--required");
    }
  });

  if (!+inputBillEl.value || !+inputPeopleEl.value) return true;
};

const removeInputError = function (e) {
  const clicked = e.target.closest(".calc-input");
  if (!clicked) return;
  clicked.closest(".input-box").classList.remove("input-box--required");
};

const checkAndCalc = function (tip) {
  if (isEmptyInputs()) {
    return;
  }
  render(calcTip(inputBillEl.value, tip, inputPeopleEl.value));
};

customCalcBtn.addEventListener("input", function () {
  calcBtns.forEach((el) => el.classList.remove("select-tip__btn--active"));
  tip = customCalcBtn.value;
  checkAndCalc(tip);
});

calcBtnsBox.addEventListener("click", (e) => {
  const clicked = e.target.closest(".select-tip__btn");
  if (!clicked) return;
  // Remove dollar sign
  tip = clicked.value.slice(0, -1);

  calcBtns.forEach((el) => {
    el.classList.remove("select-tip__btn--active");
  });

  calcInputsEl.forEach((el) => {
    if (el.value !== "" && el.value !== "0") {
      clicked.classList.add("select-tip__btn--active");
    }
  });

  customCalcBtn.value = "";
  checkAndCalc(tip);
});

tipCalcBox.addEventListener("input", removeInputError);

tipCalcBox.addEventListener("input", function (e) {
  const clicked = e.target.closest(".calc-input");
  if (!clicked) return;
  if (tip) checkAndCalc(tip);
});

resetBtn.addEventListener("click", reset);
