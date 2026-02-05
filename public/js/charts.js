
let chart;
function renderChart(activities) {
  const totals = {};
  activities.forEach(a => totals[a.category] = (totals[a.category] || 0) + a.co2);

  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: "pie",
    data: {
      labels: Object.keys(totals),
      datasets: [{ data: Object.values(totals) }]
    }
  });
}
