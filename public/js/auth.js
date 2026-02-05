
async function login() {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value })
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
  location.href = "dashboard.html";
}

async function register() {
  await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value, username: email.value })
  });
  alert("Registered!");
}
