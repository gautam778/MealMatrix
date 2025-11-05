import pool from "../db.js";

//  Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at FROM users ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(" Error fetching users:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

//  Fetch all donations
export const getAllDonations = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.*, u.name AS donor_name
       FROM donations d
       JOIN users u ON d.donor_id = u.id
       ORDER BY d.created_at DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(" Error fetching donations:", err);
    res.status(500).json({ message: "Error fetching donations" });
  }
};

//  Fetch all requests
export const getAllRequests = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
         r.id AS request_id,
         r.status AS request_status,
         r.request_date,
         d.food_type,
         d.quantity,
         u.name AS recipient_name
       FROM requests r
       JOIN donations d ON r.donation_id = d.id
       JOIN users u ON r.recipient_id = u.id
       ORDER BY r.request_date DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(" Error fetching requests:", err);
    res.status(500).json({ message: "Error fetching requests" });
  }
};

//  Update donation or request status
export const updateStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;

    if (!["donation", "request"].includes(type)) {
      return res.status(400).json({ message: "Invalid type" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    // Update in the correct table
    if (type === "donation") {
      await pool.query("UPDATE donations SET status=? WHERE id=?", [status, id]);
    } else if (type === "request") {
      await pool.query("UPDATE requests SET status=? WHERE id=?", [status, id]);
    }

    res.json({ message: `${type} status updated successfully` });
  } catch (err) {
    console.error(" Error updating status:", err);
    res.status(500).json({ message: "Error updating status" });
  }
};
