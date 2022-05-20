"use strict";
const shareBtn = document.querySelector(".article__share");
const authorSection = document.querySelector(".article__author-section");

shareBtn.addEventListener("click", (e) => {
  const clicked = e.target.closest(".article__share");
  if (!clicked) return;
  authorSection.classList.toggle("show");
});
