const url = "https://api.adviceslip.com/advice";
const btnGetAdvice = document.querySelector(".get-advice");
const adviceText = document.querySelector(".advice-text");
const adviceId = document.querySelector(".advice-id");

const showAdvice = async function () {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const advice = data.slip;
    adviceText.innerText = advice.advice;
    adviceId.innerText = advice.id;
  } catch (error) {
    console.log(error);
  }
};

btnGetAdvice.addEventListener("click", showAdvice);
