import express from "express";
import { getUserProfile } from "../controllers/usercontroller.js"; // Import the controller

const router = express.Router();

// Route to fetch user profile by email
router.get("/profile", getUserProfile);

export default router;
