import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../db.js";

export async function register(req, res) {
  try {
    const { name, email, password, role, adminKey } = req.body;

    // Optional: Protect admin registration with key
    if (role === "admin" && adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ message: "Invalid admin registration key" });
    }

    const [existing] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existing.length) return res.status(400).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users(name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hash, role]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(400).json({ message: "Invalid credentials" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
}
