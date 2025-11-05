import express from "express";
import { authenticate } from "../middleware/auth.js";
import { listAvailable, requestDonation } from "../controllers/recipientController.js";

const router = express.Router();

router.get("/available", authenticate, listAvailable);
router.post("/request", authenticate, requestDonation);

export default router;
