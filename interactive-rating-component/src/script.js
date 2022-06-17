"use strict";

const btnSubmit = document.querySelector(".poll__form-submit-btn");
const ratePoll = document.querySelector(".rate__poll");
const rateThanks = document.querySelector(".rate__thanks");
const selected = document.getElementById("selected");

const toggleHidden = function () {
  ratePoll.classList.add("rate__poll--hidden");
  rateThanks.classList.remove("rate__thanks--hidden");

  setTimeout(() => {
    rateThanks.classList.add("rate__thanks--hidden");
    ratePoll.classList.remove("rate__poll--hidden");
  }, 2000);
};

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  const active = document.querySelector(".poll__form-input:checked");
  selected.innerText = active.value;

  toggleHidden();
  active.checked = false;
});
