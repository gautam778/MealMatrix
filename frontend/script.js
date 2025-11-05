const API_BASE = "http://localhost:5000/api";

// -----------------------
// Registration
// -----------------------
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const payload = Object.fromEntries(formData.entries());

    if (payload.role === "admin") {
      const key = prompt("Enter Admin Registration Key:");
      if (!key) {
        alert("Admin key required!");
        return;
      }
      payload.adminKey = key;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      document.getElementById("registerStatus").textContent = res.ok
        ? " Registered successfully! Please login."
        : data.message || "Registration failed.";

      if (res.ok) registerForm.reset();
    } catch (err) {
      document.getElementById("registerStatus").textContent =
        "Error connecting to server.";
    }
  });
}

// -----------------------
// Login
// -----------------------
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.user.role);
        document.getElementById("loginStatus").textContent =
          " Login successful! Redirecting...";

        setTimeout(() => {
          if (data.user.role === "admin") {
            window.location.href = "admin.html";
          } else if (data.user.role === "donor") {
            window.location.href = "donor.html";
          } else if (data.user.role === "recipient") {
            window.location.href = "recipient.html";
          }
        }, 1000);
      } else {
        document.getElementById("loginStatus").textContent =
          data.message || "Invalid credentials.";
      }
    } catch (err) {
      document.getElementById("loginStatus").textContent =
        "Error connecting to server.";
    }
  });
}
