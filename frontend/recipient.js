// ================================
// 🌟 Recipient Dashboard Script
// ================================

// Load available donations when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadAvailableDonations();

  document.getElementById("refreshDonations").addEventListener("click", loadAvailableDonations);
  document.getElementById("logoutBtn").addEventListener("click", logoutUser);
});

// ================================
// 🔐 Fetch Available Donations
// ================================
async function loadAvailableDonations() {
  const token = localStorage.getItem("token");

  // If user not logged in, redirect
  if (!token) {
    alert("Please login first!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/recipient/available", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`, //  Include token
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const tbody = document.querySelector("#availableTable tbody");
    tbody.innerHTML = "";

    if (!response.ok) {
      tbody.innerHTML = `<tr><td colspan="5">${data.message || "Failed to load donations."}</td></tr>`;
      console.error("Server Error:", data.message);
      return;
    }

    // If no donations
    if (!data || data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">No available donations.</td></tr>`;
      return;
    }

    // Populate donation list
    data.forEach((donation, index) => {
      const row = `
        <tr>
          <td>${index + 1}</td>
          <td>${donation.food_type}</td>
          <td>${donation.quantity}</td>
          <td>${donation.pickup_location}</td>
          <td>
            <button class="btn small-btn" onclick="requestDonation(${donation.id})">Request</button>
          </td>
        </tr>
      `;
      tbody.insertAdjacentHTML("beforeend", row);
    });

  } catch (error) {
    console.error(" Error loading donations:", error);
    alert("Something went wrong while fetching donations.");
  }
}

// ================================
//  Request a Donation
// ================================
async function requestDonation(donationId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first!");
    window.location.href = "index.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/recipient/request", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, //  Include token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ donation_id: donationId }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(" Donation requested successfully!");
      loadAvailableDonations(); // Refresh table
    } else {
      alert(` ${data.message || "Failed to request donation."}`);
    }

  } catch (error) {
    console.error(" Error requesting donation:", error);
    alert("Server error while requesting donation.");
  }
}

// ================================
// 🚪 Logout Function
// ================================
function logoutUser() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
