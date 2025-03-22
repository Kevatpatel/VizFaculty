import express from "express";
import { addPublication, getPendingPublications, approvePublication, rejectPublication,getConferenceCount,getJournalCount } from "../controllers/publicationController.js";

const router = express.Router();

router.post("/add", addPublication); // Add a new publication
router.get("/pending", getPendingPublications); // Get only pending publications
router.put("/approve/:id", approvePublication); // Approve a publication
router.delete("/reject/:id", rejectPublication); // Reject a publication
router.get("/api/journal-publications/count", getJournalCount);
router.get("/api/conference-publications/count", getConferenceCount);
export default router;
