import express from "express";
import {
  submitConferencePublication,
  getPendingConferencePublications,
  approveConferencePublication,
  deleteConferencePublication,
  getApprovedConferencePublications,
  getacceptingConferencePublications
} from "../controllers/conferencePublicationController.js";

const router = express.Router();

// Route to submit a conference publication
router.post("/submit", submitConferencePublication);

// Route to get pending conference publications for admin
router.get("/pending", getPendingConferencePublications);

router.get("/approved", getacceptingConferencePublications);

// Route to approve a conference publication
router.put("/approve/:id", approveConferencePublication);

// Route to delete a rejected conference publication
router.delete("/delete/:id", deleteConferencePublication);

// Route to get approved conference publications of a faculty
router.get("/approved/:email", getApprovedConferencePublications);

export default router;
