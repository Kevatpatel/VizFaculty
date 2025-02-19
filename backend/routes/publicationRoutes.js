import express from "express";
import { addPublication, getPendingPublications, approvePublication, rejectPublication } from "../controllers/publicationController.js";

const router = express.Router();

router.post("/add", addPublication); // Add a new publication
router.get("/pending", getPendingPublications); // Get only pending publications
router.put("/approve/:id", approvePublication); // Approve a publication
router.delete("/reject/:id", rejectPublication); // Reject a publication

export default router;
