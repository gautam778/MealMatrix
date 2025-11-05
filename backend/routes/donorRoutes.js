import express from "express";
import { authenticate } from "../middleware/auth.js";
import { addDonation, myDonations } from "../controllers/donorController.js";

const router = express.Router();

//  Add new donation
router.post("/add", authenticate, addDonation);

//  Get all donations made by this donor
router.get("/my-donations", authenticate, myDonations);

export default router;
