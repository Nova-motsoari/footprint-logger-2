
const token = localStorage.getItem("token");

async function load() {
  const h = { Authorization: "Bearer " + token };
  const sum = await fetch("/api/activities/summary", { headers: h }).then(r => r.json());
  const avg = await fetch("/api/activities/community-average").then(r => r.json());
  const acts = await fetch("/api/activities", { headers: h }).then(r => r.json());

  document.getElementById("total").textContent = sum.totalEmissions?.toFixed(2) || 0;
  document.getElementById("avgEl").textContent = avg.average?.toFixed(2) || 0;

  renderChart(acts);
}

async function addActivity() {
  await fetch("/api/activities", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ label: "Car travel", category: "transport", co2: 2.3 })
  });
  load();
}

load();
