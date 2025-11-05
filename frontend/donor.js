const API_BASE = "http://localhost:5000/api/donor";
const token = localStorage.getItem("token");

// 🔹 DOM Elements
const form = document.getElementById("donationForm");
const statusEl = document.getElementById("donationStatus");
const donationTableBody = document.querySelector("#donationTable tbody");
const refreshBtn = document.getElementById("refreshDonations");
const logoutBtn = document.getElementById("logoutBtn");

//  Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
});

//  Add Donation
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  const food_type = formData.get("food_type");
  const quantity = formData.get("quantity");
  const pickup_location = formData.get("pickup_location");
  const mobile = formData.get("mobile");
  const expiry_date = formData.get("expiry_date") || null;

  if (!food_type || !quantity || !pickup_location || !mobile) {
    statusEl.textContent = "❌ All required fields must be filled!";
    statusEl.style.color = "red";
    return;
  }

  const donationData = {
    food_type,
    quantity,
    pickup_location,
    mobile,
    expiry_date,
  };

  try {
    const res = await fetch(`${API_BASE}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(donationData),
    });

    const data = await res.json();

    if (res.ok) {
      statusEl.textContent = " Donation added successfully!";
      statusEl.style.color = "green";
      form.reset();
      loadMyDonations();
    } else {
      statusEl.textContent = ` ${data.message || "Error adding donation"}`;
      statusEl.style.color = "red";
    }
  } catch (error) {
    console.error("Error adding donation:", error);
    statusEl.textContent = " Server error.";
    statusEl.style.color = "red";
  }
});

// 🔹 Load My Donations
async function loadMyDonations() {
  try {
    const res = await fetch(`${API_BASE}/my-donations`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    donationTableBody.innerHTML = "";

    if (data.length === 0) {
      donationTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;">No donations yet</td></tr>`;
      return;
    }

    data.forEach((d, index) => {
      // Format date-only output (YYYY-MM-DD → DD/MM/YYYY)
      const donationDate = d.donation_date
        ? new Date(d.donation_date).toLocaleDateString("en-GB")
        : "—";
      const expiryDate = d.expiry_date
        ? new Date(d.expiry_date).toLocaleDateString("en-GB")
        : "—";

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${d.food_type}</td>
        <td>${d.quantity}</td>
        <td>${d.pickup_location}</td>
        <td>${d.mobile}</td>
        <td>${d.status}</td>
        <td>${donationDate}</td>
        <td>${expiryDate}</td>
      `;
      donationTableBody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading donations:", error);
    donationTableBody.innerHTML = `<tr><td colspan="8" style="text-align:center;color:red;">Error loading data</td></tr>`;
  }
}

refreshBtn.addEventListener("click", loadMyDonations);
window.addEventListener("load", loadMyDonations);
