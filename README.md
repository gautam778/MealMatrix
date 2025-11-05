# 🍱 MealMatrix — Food Donation Tracker

MealMatrix is a full-stack web application that bridges the gap between **food donors** and **recipients**, ensuring that surplus food reaches those who need it the most.  
It features distinct dashboards for **Admins**, **Donors**, and **Recipients**, each designed with functionality and simplicity in mind.

---

## 🌟 Features

### 👑 Admin Dashboard
- Manage and monitor all users, donations, and requests.
- Approve or mark requests as completed.
- Filter, sort, and view live data from the database.

### 🍱 Donor Dashboard
- Add new food donations with pickup details and optional expiry date.
- Manage your donation history.
- Automatically track status updates (available, requested, collected).

### 🤝 Recipient Dashboard
- View all available donations in real-time.
- Request and collect food easily.
- Track request history and status.

---

## 🧩 Tech Stack

| Layer | Technology Used |
|--------|----------------|
| **Frontend** | HTML, CSS, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Version Control** | Git & GitHub |
| **Optional Hosting** | GitHub Pages (Frontend), Render/Vercel (Backend) |

---

## 🗂️ Folder Structure

MealMatrix/
│
├── backend/
│ ├── server.js
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ ├── db.js
│ └── package.json
│
├── frontend/
│ ├── index.html
│ ├── donor.html
│ ├── recipient.html
│ ├── admin.html
│ ├── style.css
│ ├── donor.js
│ ├── recipient.js
│ ├── admin.js
│ └── assets/
│ └── logo.png
│
└── README.md

### 🔹 1. Clone the Repository
bash
git clone https://github.com/YOUR_USERNAME/MealMatrix.git
cd MealMatrix


###  🔹2. Backend Setup
cd backend
npm install


### 🔹 3. Create .env File in Backend Folder
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=food_donation
ADMIN_KEY=admin


### 🔹 4. Start the Server
npm run dev
Your backend will start at 👉 http://localhost:5000

### 🔹 5. Frontend Setup
Open frontend/index.html directly in your browser
or use VS Code’s Live Server extension for smoother testing.

🧠 Database Schema (MySQL)

🧍 users
ColumnTypeDescriptionidINT (PK)Auto IncrementnameVARCHAR(100)User’s nameemailVARCHAR(150)Unique emailpasswordVARCHAR(255)Hashed passwordroleENUM('donor','recipient','admin')User typecreated_atTIMESTAMPDefault CURRENT_TIMESTAMP

🍽 donations
ColumnTypeDescriptionidINT (PK)Auto Incrementdonor_idINT (FK → users.id)Donor’s IDfood_typeVARCHAR(100)Type of food donatedquantityVARCHAR(50)Quantity or weightpickup_locationVARCHAR(255)Location for collectionmobileVARCHAR(15)Donor’s contact numberexpiry_dateDATEOptional expiry datestatusENUM('available','requested','collected')Current donation statuscreated_atTIMESTAMPDefault CURRENT_TIMESTAMP

📦 requests
ColumnTypeDescriptionidINT (PK)Auto Incrementrecipient_idINT (FK → users.id)Recipient IDdonation_idINT (FK → donations.id)Donation IDstatusENUM('requested','collected','completed')Request progressrequest_dateTIMESTAMPDefault CURRENT_TIMESTAMP

🖼️ Screenshots
DashboardPreviewDonor DashboardRecipient DashboardAdmin Dashboard
(Place screenshots in /frontend/assets and update filenames if needed.)

🚀 Deployment
🌐 Frontend on GitHub Pages
git subtree push --prefix frontend origin gh-pages

Your app will be available at:
👉 https://YOUR_USERNAME.github.io/MealMatrix/
⚙️ Backend on Render / Vercel


Upload the backend/ directory


Set up environment variables (same as .env)


Connect to your MySQL database (local or remote, e.g., PlanetScale)



🧑‍💻 Developer
Author: Gautam Kumar
Project Name: 🍱 MealMatrix — Food Donation Tracker
Purpose: To reduce food waste by connecting donors and recipients efficiently
License: MIT

⭐ Support
If you like this project, give it a ⭐ on GitHub!
Every star motivates future improvements 💛
