export const chartColors = {
  default: {
    primary: "#00D1B2",
    info: "#209CEE",
    danger: "#FF3860",
  },
};

const randomChartData = (n) => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200));
  }

  return data;
};

export const datasetObject = (color, label, data) => {
  return {
    label: label,
    fill: false,
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 15,
    pointRadius: 4,
    data: data,
    tension: 0.5,
    cubicInterpolationMode: "default",
  };
};

export const sampleChartData = (points = 12) => {
  const labels = [];

  for (let i = 0; i < points; ++i) {
    labels.push(i.toString());
  }

  return {
    labels,
    datasets: [
      datasetObject("primary", points),
      datasetObject("info", points),
      datasetObject("danger", points),
    ],
  };
};
