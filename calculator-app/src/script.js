"use strict";

const panel = document.querySelector(".panel");
const body = document.querySelector("body");
const btnReset = document.querySelector(".btn--reset");
const btnDelete = document.querySelector(".btn--del");
const btnEqual = document.querySelector(".btn--equal");
const btnDot = document.getElementById("dot");
const theme1 = document.getElementById("classic-theme");
const theme2 = document.getElementById("white-theme");
const theme3 = document.getElementById("violet-theme");
const plusBtn = document.getElementById("plus");
const minusBtn = document.getElementById("minus");
const divisionBtn = document.getElementById("division");
const multiplyBtn = document.getElementById("multiply");
const buttonsKey = Array.from(document.querySelectorAll(".btn--num"));
const firstOperand = document.querySelector(".first-operand");
const secondOperand = document.querySelector(".second-operand");
const signText = document.querySelector(".sign-text");
const errorMsg = document.querySelector(".error-message");

///////////////////
// Change theme ///
//////////////////
theme1.addEventListener("click", () => {
  body.classList.remove("white-theme", "violet-theme");
  body.classList.add("classic-theme");
  localStorage.setItem("theme", "classic-theme");
});

theme2.addEventListener("click", () => {
  body.classList.remove("classic-theme", "violet-theme");
  body.classList.add("white-theme");
  localStorage.setItem("theme", "white-theme");
});

theme3.addEventListener("click", () => {
  body.classList.remove("white-theme", "classic-theme");
  body.classList.add("violet-theme");
  localStorage.setItem("theme", "violet-theme");
});

const theme = localStorage.getItem("theme");
if (theme) {
  body.classList.add(theme);
  const input = document.getElementById(`${theme}`);
  input.checked = true;
}

////////////////////////////////////
/*         Calculation            */
///////////////////////////////////
let a = "";
let b = "";
let currentSign = "";
let start = true;
let sumOfLentgh = 0;
let finish = false;

const clear = function () {
  panel.style.fontSize = "inherit";
  errorMsg.innerText = "";
  signText.innerText = "";
  currentSign = "";
  firstOperand.innerText = "";
  secondOperand.innerText = "";
  a = "";
  b = "";
  start = true;
  finish = false;
};

const renderError = function (message) {
  const markup = `${message}`;
  errorMsg.innerText = markup;
};

const updateFontSize = function (a, b) {
  a = a.toString();
  b = b.toString();
  if (a.length >= 11 || a.length + b.length + 1 >= 10)
    panel.style.fontSize = "0.8em";
  if (a.length >= 11 || a.length + b.length + 1 >= 14)
    panel.style.fontSize = "0.72em";
  if (a.length >= 17) panel.style.fontSize = "0.6em";
};

const calc = function (sign, a, b) {
  let result;
  switch (sign) {
    case "+":
      result = +a + +b;
      return a.toString().includes(".") || b.toString().includes(".")
        ? result.toFixed(2)
        : result;
    case "-":
      result = +a - +b;
      return a.toString().includes(".") || b.toString().includes(".")
        ? result.toFixed(2)
        : result;
    case "x":
      result = +a * +b;
      return Number.isInteger(result) ? result : result.toFixed(2);
    case "/":
      result = +a / +b;
      return Number.isInteger(result) ? result : result.toFixed(2);
  }
};

const checkAndCalc = function (sign) {
  if (start && currentSign === "") currentSign = sign;
  if (b === "") currentSign = sign;
  if (finish) currentSign = sign;
  // Inserting a sign on the screen
  if (a !== "") signText.innerText = sign;

  if (b !== "" && finish) {
    b = "";
    finish = false;
  }
  // Calculation when buttons are pressed: plusBtn, minusBtn, etc..
  if (a !== "" && b !== "" && typeof a !== "undefined") {
    let result =
      currentSign !== sign ? calc(currentSign, a, b) : calc(sign, a, b);
    a = firstOperand.innerText = result;
    currentSign = sign;
    secondOperand.innerText = "";
    b = "";
    start = false;
  }

  // Checking division by zero
  if (!isFinite(+a)) {
    signText.innerText = "";
    firstOperand.innerText = "";
    renderError(`Can't divide by 0!`);
    setTimeout(() => {
      clear();
    }, 1200);
  }
  updateFontSize(a, b);
};

const repeatCalc = function (sign) {
  if (b === "") b = a;
  if (a !== "" && b !== "" && typeof a !== "undefined") {
    let result =
      currentSign !== sign ? calc(currentSign, a, b) : calc(sign, a, b);
    a = firstOperand.innerText = result;
    currentSign = sign;
    secondOperand.innerText = "";
    signText.innerText = "";
  }
  if (!isFinite(+a) && b !== "") {
    signText.innerText = "";
    firstOperand.innerText = "";
    renderError(`Can't divide by 0!`);
    setTimeout(() => {
      clear();
    }, 1200);
  }
  updateFontSize(a, b);
};

plusBtn.addEventListener("mousedown", () => {
  checkAndCalc("+");
});

minusBtn.addEventListener("mousedown", () => {
  checkAndCalc("-");
});

multiplyBtn.addEventListener("mousedown", () => {
  checkAndCalc("x");
});

divisionBtn.addEventListener("mousedown", () => {
  checkAndCalc("/");
});

buttonsKey.map((button) => {
  button.addEventListener("mousedown", function (e) {
    if (finish) clear();
    if (b === "" && signText.textContent === "" && a.toString().length < 16) {
      a += e.target.textContent;
      firstOperand.textContent = a;
    }
    if (a !== "" && signText.textContent !== "" && b.toString().length < 16) {
      b += e.target.textContent;
      secondOperand.textContent = b;
    }
    updateFontSize(a, b);
  });
});

btnDot.addEventListener("mousedown", (e) => {
  if (finish && a !== "" && b !== "") {
    clear();
    a = "0.";
    firstOperand.textContent = a;
    finish = false;
  }

  if (
    a !== "" &&
    !a.toString().includes(".") &&
    b === "" &&
    !finish &&
    signText.textContent === ""
  ) {
    a += e.target.textContent;
    firstOperand.textContent = a;
  }
  if (b !== "" && !b.toString().includes(".") && !finish) {
    b += e.target.textContent;
    secondOperand.textContent = b;
  }
});

btnReset.addEventListener("mousedown", clear);

btnEqual.addEventListener("mousedown", () => {
  finish = true;
  repeatCalc(currentSign);
});

btnDelete.addEventListener("mousedown", function () {
  sumOfLentgh =
    a.toString().length + signText.textContent.length + b.toString().length;

  if (sumOfLentgh === 0) return;

  // Deleting characters after repeatCalc, since b is not equal to an empty string.
  if (b !== "" && finish) {
    clear();
  }

  if (b !== "") {
    b = b.toString().slice(0, -1);
    secondOperand.textContent = b;
  }
  if (
    a !== "" &&
    b === "" &&
    a.toString().length + signText.textContent.length === sumOfLentgh
  ) {
    signText.textContent = "";
  }

  if (
    a !== "" &&
    signText.textContent === "" &&
    a.toString().length === sumOfLentgh
  ) {
    a = a.toString().slice(0, -1);
    firstOperand.textContent = a;
  }

  sumOfLentgh = sumOfLentgh - 1;
});
