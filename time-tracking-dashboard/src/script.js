"use strict";
// (this data was attached as a separate file)
const testDataJSON = [
  {
    title: "Work",
    timeframes: {
      daily: {
        current: 5,
        previous: 7,
      },
      weekly: {
        current: 32,
        previous: 36,
      },
      monthly: {
        current: 103,
        previous: 128,
      },
    },
  },
  {
    title: "Play",
    timeframes: {
      daily: {
        current: 1,
        previous: 2,
      },
      weekly: {
        current: 10,
        previous: 8,
      },
      monthly: {
        current: 23,
        previous: 29,
      },
    },
  },
  {
    title: "Study",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 7,
      },
      monthly: {
        current: 13,
        previous: 19,
      },
    },
  },
  {
    title: "Exercise",
    timeframes: {
      daily: {
        current: 1,
        previous: 1,
      },
      weekly: {
        current: 4,
        previous: 5,
      },
      monthly: {
        current: 11,
        previous: 18,
      },
    },
  },
  {
    title: "Social",
    timeframes: {
      daily: {
        current: 1,
        previous: 3,
      },
      weekly: {
        current: 5,
        previous: 10,
      },
      monthly: {
        current: 21,
        previous: 23,
      },
    },
  },
  {
    title: "Self Care",
    timeframes: {
      daily: {
        current: 0,
        previous: 1,
      },
      weekly: {
        current: 2,
        previous: 2,
      },
      monthly: {
        current: 7,
        previous: 11,
      },
    },
  },
];
const switchItems = document.querySelectorAll(".switch");
const reportCardEl = document.querySelector(".report");
let timeFrame;

const createTitle = function (title) {
  return title.replace(" ", "-").toLowerCase();
};
const createDate = function (timeFrame) {
  switch (timeFrame) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last Week";
    case "monthly":
      return "Last Month";
  }
};

const render = function (title, cur_time, prev_time, timeFrame) {
  const markup = `
        <div class="card data-card ${createTitle(title)}">
        <div class="img-box">
          <img class="img-${createTitle(
            title
          )}" src="images/icon-${createTitle(title)}.svg" alt="" />
        </div>
    
        <div class="title">
          <p>${title}</p>
          <img src="images/icon-ellipsis.svg" alt="" />
        </div>
    
        <div class="time">
          <p class="cur-time">${cur_time}hrs</p>
          <p class="prev-time">${createDate(timeFrame)}- ${prev_time}hrs</p>
        </div>
      </div>
        `;
  reportCardEl.insertAdjacentHTML("beforebegin", markup);
};

const createCards = function () {
  const cards = document.querySelectorAll(".data-card");
  cards.forEach((el) => el.remove());

  testDataJSON.forEach((elem) => {
    const { title, timeframes } = elem;
    render(
      title,
      timeframes[timeFrame].current,
      timeframes[timeFrame].previous,
      timeFrame
    );
  });
};

switchItems.forEach((el) => {
  el.addEventListener("change", function (e) {
    timeFrame = e.target.value.toLowerCase();
    createCards();
  });
});
