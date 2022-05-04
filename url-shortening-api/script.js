"use strict";
// https://api.shrtco.de/v2/shorten?url=example.org/very/long/link.html
const API_URL = "https://api.shrtco.de/v2/shorten?";

const shortenInputEL = document.querySelector(".shorten-input");
const formElem = document.getElementById("shorten-form");
const shortenLinkBoxEL = document.querySelector(".shorten-link-box");
const featuresSection = document.querySelector(".features-section");

// Make Mobile Navigation
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Core Logic
const shortLinksArr = [];

const init = function () {
  const previousRequests = JSON.parse(localStorage.getItem("links"));
  if (!previousRequests) return;
  previousRequests.forEach((arr) => {
    showShortLink(...arr);
  });
};

const renderError = function (err) {
  const markup = `
    <div class="container error-message">${err}</div>
  `;
  shortenLinkBoxEL.insertAdjacentHTML("afterend", markup);
  setTimeout(() => {
    document.querySelector(".error-message").remove();
  }, 5000);
};

const showShortLink = function (original, short) {
  const markup = `
    <div class="container short-link-result">
      <div class="original-link">
        <p>${original}</p>
      </div>
      <div class="copy-link">
        <a class="link" href="${short}">${short}</a>
        <button data-link="${short}" class="btn copy-btn" id="copy">Copy</button>
      </div>
    </div>
  `;
  shortenLinkBoxEL.insertAdjacentHTML("afterend", markup);
  shortenInputEL.value = "";
};

formElem.addEventListener("submit", async function (e) {
  e.preventDefault();

  if (shortenInputEL.value === "") {
    shortenInputEL.classList.add("shorten-input-required");
    shortenLinkBoxEL.classList.add("required");
    return;
  }
  try {
    if (shortenInputEL.value !== "") {
      shortenInputEL.classList.remove("shorten-input-required");
      shortenLinkBoxEL.classList.remove("required");
    }
    const response = await fetch(API_URL, {
      method: "POST",
      mode: "cors",
      body: new FormData(formElem),
    });
    const data = await response.json();
    if (!data.ok) throw new Error(data.error);
    const { original_link: original, full_short_link: short } = data.result;
    shortLinksArr.push([original, short]);
    showShortLink(original, short);
  } catch (error) {
    renderError(error.message);
  }

  localStorage.setItem("links", JSON.stringify(shortLinksArr));
});

featuresSection.addEventListener("click", function (e) {
  const copyBtn = e.target.closest("#copy");
  if (!copyBtn) return;

  const changeBtn = function (text = "Copy", color = "#2acfcf") {
    copyBtn.innerText = text;
    copyBtn.style.backgroundColor = color;
  };
  changeBtn("Copied!", "#3b3054");
  setTimeout(changeBtn, 2000);

  navigator.clipboard.writeText(copyBtn.dataset.link);
});

init();
