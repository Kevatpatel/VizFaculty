import JournalPublication from "../models/JournalPublication.js";

// ✅ Create a new journal publication request
export const createPublication = async (req, res) => {
    try {
        const { title, authors, email, journalName, volume, issue, pages, year, doi, impactFactor, abstract } = req.body;

        // Ensure required fields are present
        if (!title || !authors || !email || !journalName || !year) {
            return res.status(400).json({ error: "All required fields must be filled!" });
        }

        const newPublication = new JournalPublication({
            title,
            authors,
            email, // Include email
            journalName,
            volume,
            issue,
            pages,
            year,
            doi,
            impactFactor,
            abstract,
            publicationStatus: "pending"  // Default status
        });

        await newPublication.save();
        res.status(201).json({ message: "Publication submitted successfully!", publication: newPublication });
    } catch (error) {
        console.error("❌ Error submitting publication:", error);
        res.status(500).json({ error: "Failed to submit publication" });
    }
};

// ✅ Fetch all pending journal publications
export const getPendingPublications = async (req, res) => {
    try {
        const publications = await JournalPublication.find({ publicationStatus: "pending" });
        res.json(publications);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pending publications" });
    }
};

const getacceptingPublications = async (req, res) => {
    try {
      const pendingPublications = await JournalPublication.find({ publicationStatus: "approved" });
      res.status(200).json(pendingPublications);
    } catch (error) {
      console.error("Error fetching approved publications:", error);
      res.status(500).json({ error: "Server error" });
    }
  };

// ✅ Approve a journal publication
export const approvePublication = async (req, res) => {
    try {
        const { id } = req.params;
        await JournalPublication.findByIdAndUpdate(id, { publicationStatus: "approved" });
        res.json({ message: "Publication approved successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to approve publication" });
    }
};

// ✅ Reject (delete) a journal publication
export const rejectPublication = async (req, res) => {
    try {
        const { id } = req.params;
        await JournalPublication.findByIdAndDelete(id);
        res.json({ message: "Publication rejected and removed" });
    } catch (error) {
        res.status(500).json({ error: "Failed to reject publication" });
    }
};


// Fetch approved publications by faculty email
const getApprovedPublications = async (req, res) => {
    try {
        const { email } = req.params;
        const publications = await JournalPublication.find({ email, publicationStatus: "approved" });
        res.json(publications);
    } catch (error) {
        console.error("❌ Error fetching approved publications:", error);
        res.status(500).json({ error: "Error fetching approved publications" });
    }
};

// Export controllers as named exports
export { getApprovedPublications, getacceptingPublications};