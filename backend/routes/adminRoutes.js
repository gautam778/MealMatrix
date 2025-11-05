import express from "express";
import { authenticate } from "../middleware/auth.js";
import { 
  getAllUsers, 
  getAllDonations, 
  getAllRequests, 
  updateStatus 
} from "../controllers/adminController.js";

const router = express.Router();

//  Protected routes (only admin)
router.get("/users", authenticate, getAllUsers);
router.get("/donations", authenticate, getAllDonations);
router.get("/requests", authenticate, getAllRequests);

// Update donation/request status
router.put("/update/:type/:id", authenticate, updateStatus);

export default router;
