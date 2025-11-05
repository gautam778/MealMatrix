import pool from "../db.js";

export const addDonation = async (req, res) => {
  try {
    const donorId = req.user.id;
    const { food_type, quantity, pickup_location, mobile, notes, expiry_date } = req.body;

    if (!food_type || !quantity || !pickup_location || !mobile) {
      return res.status(400).json({ message: " All required fields must be filled!" });
    }

    const sql = `
      INSERT INTO donations 
      (donor_id, food_type, quantity, pickup_location, mobile, notes, expiry_date, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'available', NOW())
    `;

    await pool.query(sql, [
      donorId,
      food_type,
      quantity,
      pickup_location,
      mobile,
      notes || null,
      expiry_date || null,
    ]);

    res.json({ success: true, message: " Donation added successfully!" });
  } catch (error) {
    console.error(" Error adding donation:", error);
    res.status(500).json({ message: "Server error while adding donation" });
  }
};

export const myDonations = async (req, res) => {
  try {
    const donorId = req.user.id;
    const [rows] = await pool.query(
      "SELECT *, DATE(created_at) AS donation_date FROM donations WHERE donor_id = ? ORDER BY created_at DESC",
      [donorId]
    );
    res.json(rows);
  } catch (error) {
    console.error(" Error fetching donations:", error);
    res.status(500).json({ message: "Error fetching donations" });
  }
};
