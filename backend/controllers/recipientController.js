import pool from "../db.js";

//  List available donations
export const listAvailable = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        d.id,
        d.food_type,
        d.quantity,
        d.pickup_location,
        d.mobile,
        DATE(d.created_at) AS donation_date,
        d.expiry_date
      FROM donations d
      WHERE d.status = 'available'
      ORDER BY d.created_at DESC
    `);

    res.json(rows);
  } catch (error) {
    console.error(" Error fetching available donations:", error);
    res.status(500).json({ message: "Error fetching available donations" });
  }
};

//  Request a donation
export const requestDonation = async (req, res) => {
  try {
    const recipientId = req.user.id;
    const { donation_id } = req.body;

    if (!donation_id) {
      return res.status(400).json({ message: "Donation ID is required" });
    }

    // Check if donation exists and is available
    const [donation] = await pool.query("SELECT * FROM donations WHERE id=? AND status='available'", [donation_id]);
    if (donation.length === 0) {
      return res.status(404).json({ message: "Donation not available" });
    }

    // Create new request
    await pool.query(
      "INSERT INTO requests (recipient_id, donation_id, status, request_date) VALUES (?, ?, 'requested', NOW())",
      [recipientId, donation_id]
    );

    // Update donation status
    await pool.query("UPDATE donations SET status='requested' WHERE id=?", [donation_id]);

    res.json({ message: "Donation requested successfully!" });
  } catch (error) {
    console.error(" Error requesting donation:", error);
    res.status(500).json({ message: "Error requesting donation" });
  }
};
