"use strict";

const defaultExpenseColor = "#ec775f";
const highExpenseColor = "#76b5bc";
const defaultExpenseColorHover = "#f0927f";
const highExpenseColorHover = "#91c4c9";
const labels = [];
const spendings = [];

const bgcOrHover = (defaultColor, highColor) => {
  return spendings.map((el, _, arr) => {
    return el !== Math.max(...arr) ? defaultColor : highColor;
  });
};

const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector("div");
  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.classList.add("chartToolTip");
    chart.canvas.parentNode.appendChild(tooltipEl);
  }
  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  if (tooltip.body) {
    tooltipEl.innerHTML = `
      <p class="chartToolTip__text">
        $<span class="chartToolTip__value">${tooltip.dataPoints[0].raw}</span>
      </p>
    `;
    tooltipEl.style.opacity = 1;
  }
  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY + "px";
};

const getData = async function () {
  const response = await fetch("data.json");
  const data = await response.json();
  data.forEach((element) => {
    spendings.push(element.amount);
    labels.push(element.day);
  });
};

const createChart = async function () {
  await getData();
  const data = {
    labels,
    datasets: [
      {
        backgroundColor: bgcOrHover(defaultExpenseColor, highExpenseColor),
        hoverBackgroundColor: bgcOrHover(
          defaultExpenseColorHover,
          highExpenseColorHover
        ),
        borderRadius: "5",
        borderSkipped: false,
        data: spendings,
      },
    ],
  };
  const config = {
    type: "bar",
    data: data,
    options: {
      onHover: (e, chartElement) => {
        const target = e.native.target;
        target.style.cursor = chartElement[0] ? "pointer" : "default";
      },
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            font: {
              size: 15,
              family: "DM Sans",
            },
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
          position: "average",
          external: externalTooltipHandler,
        },
      },
    },
  };
  const myChart = new Chart(document.getElementById("myChart"), config);
};

createChart();
