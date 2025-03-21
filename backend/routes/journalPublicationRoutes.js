import express from "express";
import { getPendingPublications,getacceptingPublications, getApprovedPublications,approvePublication, rejectPublication ,createPublication} from "../controllers/journalPublicationController.js";

const router = express.Router();

// Route to submit a journal publication
router.post("/submit", createPublication);
router.get("/journal/pending", getPendingPublications);
router.get("/journal/approved", getacceptingPublications);

router.put("/journal/approve/:id", approvePublication);
router.delete("/journal/reject/:id", rejectPublication);
router.get("/approved/:email", getApprovedPublications);
export default router;