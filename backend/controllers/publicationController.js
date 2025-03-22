import Publication from "../models/Publication.js";
import JournalPublication from "../models/JournalPublication.js"
import ConferencePublication from "../models/ConferencePublication.js"
// Add a new publication with status "pending"
const addPublication = async (req, res) => {
  try {
    const { title, authors, journal, year, doi, abstract } = req.body;

    if (!title || !authors || !journal || !year) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPublication = new Publication({
      title,
      authors,
      journal,
      year,
      doi: doi || "",
      abstract: abstract || "",
      status: "pending",
    });

    await newPublication.save();
    res.status(201).json({ message: "Publication saved successfully", data: newPublication });
  } catch (error) {
    console.error("Error saving publication:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const getJournalCount = async (req, res) => {
  try {
    const count = await JournalPublication.countDocuments({ status: "approved" });
    res.json({ count });
  } catch (error) {
    console.error("❌ Error fetching journal count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get count of approved conference publications
const getConferenceCount = async (req, res) => {
  try {
    const count = await ConferencePublication.countDocuments({ status: "approved" });
    res.json({ count });
  } catch (error) {
    console.error("❌ Error fetching conference count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get only pending publications
const getPendingPublications = async (req, res) => {
  try {
    const pendingPublications = await Publication.find({ status: "pending" });
    res.status(200).json(pendingPublications);
  } catch (error) {
    console.error("Error fetching pending publications:", error);
    res.status(500).json({ error: "Server error" });
  }
};




// Approve a publication (change status to "approved")
const approvePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByIdAndUpdate(id, { status: "approved" }, { new: true });

    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json({ message: "Publication approved", data: publication });
  } catch (error) {
    console.error("Error approving publication:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Reject a publication (delete from DB)
const rejectPublication = async (req, res) => {
  try {
    const { id } = req.params;
    const publication = await Publication.findByIdAndDelete(id);

    if (!publication) {
      return res.status(404).json({ error: "Publication not found" });
    }
    res.status(200).json({ message: "Publication rejected and removed" });
  } catch (error) {
    console.error("Error rejecting publication:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { addPublication, getPendingPublications, approvePublication, rejectPublication,getConferenceCount,getJournalCount };
