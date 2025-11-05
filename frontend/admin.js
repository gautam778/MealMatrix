document.addEventListener("DOMContentLoaded", () => {
  loadUsers();
  loadDonations();
  loadRequests();

  document.getElementById("refreshUsers").addEventListener("click", loadUsers);
  document.getElementById("refreshDonations").addEventListener("click", loadDonations);
  document.getElementById("refreshRequests").addEventListener("click", loadRequests);
  document.getElementById("logoutBtn").addEventListener("click", logoutUser);
});

const BASE_URL = "http://localhost:5000/api/admin";

// ================================
// 🧍 USERS
// ================================
async function loadUsers() {
  const token = localStorage.getItem("token");
  const tbody = document.querySelector("#usersTable tbody");
  tbody.innerHTML = "<tr><td colspan='5'>Loading...</td></tr>";

  try {
    const res = await fetch(`${BASE_URL}/users`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const users = await res.json();

    if (!res.ok) throw new Error(users.message || "Error loading users");

    tbody.innerHTML = users.length
      ? users.map((u, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${u.name}</td>
          <td>${u.email}</td>
          <td>${u.role}</td>
          <td>${new Date(u.created_at).toLocaleDateString()}</td>
        </tr>`).join("")
      : "<tr><td colspan='5'>No users found.</td></tr>";

  } catch (err) {
    console.error(err);
    tbody.innerHTML = "<tr><td colspan='5'>Error loading users</td></tr>";
  }
}

// ================================
//  DONATIONS
// ================================
async function loadDonations() {
  const token = localStorage.getItem("token");
  const tbody = document.querySelector("#donationsTable tbody");
  tbody.innerHTML = "<tr><td colspan='6'>Loading...</td></tr>";

  try {
    const res = await fetch(`${BASE_URL}/donations`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const donations = await res.json();

    if (!res.ok) throw new Error(donations.message || "Error loading donations");

    tbody.innerHTML = donations.length
      ? donations.map((d, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${d.food_type}</td>
          <td>${d.quantity}</td>
          <td>${d.donor_name}</td>
          <td>${d.status}</td>
          <td>${new Date(d.created_at).toLocaleDateString()}</td>
        </tr>`).join("")
      : "<tr><td colspan='6'>No donations found.</td></tr>";

  } catch (err) {
    console.error(err);
    tbody.innerHTML = "<tr><td colspan='6'>Error loading donations</td></tr>";
  }
}

// ================================
//  REQUESTS
// ================================
async function loadRequests() {
  const token = localStorage.getItem("token");
  const tbody = document.querySelector("#requestsTable tbody");
  tbody.innerHTML = "<tr><td colspan='7'>Loading...</td></tr>";

  try {
    const res = await fetch(`${BASE_URL}/requests`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    const requests = await res.json();

    if (!res.ok) throw new Error(requests.message || "Error loading requests");

    tbody.innerHTML = requests.length
      ? requests.map((r, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${r.recipient_name}</td>
          <td>${r.food_type}</td>
          <td>${r.quantity}</td>
          <td>${r.request_status}</td>
          <td>${new Date(r.request_date).toLocaleDateString()}</td>
          <td>
            ${r.request_status === "collected"
              ? " Completed"
              : `<button class="btn small-btn" onclick="markComplete('request', ${r.request_id})">Mark Complete</button>`}
          </td>
        </tr>`).join("")
      : "<tr><td colspan='7'>No requests found.</td></tr>";

  } catch (err) {
    console.error(err);
    tbody.innerHTML = "<tr><td colspan='7'>Error loading requests</td></tr>";
  }
}

// ================================
//  MARK COMPLETE
// ================================
async function markComplete(type, id) {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${BASE_URL}/update/${type}/${id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "collected" }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(" Status updated successfully!");
      loadRequests();
    } else {
      alert(` ${data.message || "Error updating status"}`);
    }

  } catch (error) {
    console.error(" Error marking complete:", error);
    alert("Server error while updating status.");
  }
}

// ================================
//  LOGOUT
// ================================
function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
