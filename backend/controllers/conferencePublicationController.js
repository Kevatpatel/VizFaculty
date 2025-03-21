import ConferencePublication from "../models/ConferencePublication.js";

export const submitConferencePublication = async (req, res) => {
    try {
      console.log("Received submission request:", req.body); // Log incoming request
  
      const newPublication = new ConferencePublication(req.body);
      await newPublication.save();
  
      res.status(201).json({ message: "Conference publication submitted successfully!" });
    } catch (error) {
      console.error("Submission error:", error); // Log actual error
      res.status(500).json({ error: error.message || "Error submitting conference publication" });
    }
  };
  

// Get all pending conference publications for admin review
export const getPendingConferencePublications = async (req, res) => {
  try {
    const pendingPublications = await ConferencePublication.find({ status: "pending" });
    res.json(pendingPublications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching pending conference publications" });
  }
};

export const getacceptingConferencePublications = async (req, res) => {
  try {
    const pendingPublications = await ConferencePublication.find({ status: "approved" });
    res.json(pendingPublications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching approved conference publications" });
  }
};


// Approve a conference publication (change status to approved)
export const approveConferencePublication = async (req, res) => {
  try {
    const { id } = req.params;
    await ConferencePublication.findByIdAndUpdate(id, { status: "approved" });
    res.json({ message: "Conference publication approved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error approving conference publication" });
  }
};

// Delete a rejected conference publication
export const deleteConferencePublication = async (req, res) => {
  try {
    const { id } = req.params;
    await ConferencePublication.findByIdAndDelete(id);
    res.json({ message: "Conference publication deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting conference publication" });
  }
};

// Get all approved conference publications of a faculty
export const getApprovedConferencePublications = async (req, res) => {
  try {
    const { email } = req.params;
    const approvedPublications = await ConferencePublication.find({ facultyEmail: email, status: "approved" });
    res.json(approvedPublications);
  } catch (error) {
    res.status(500).json({ error: "Error fetching approved conference publications" });
  }
};
