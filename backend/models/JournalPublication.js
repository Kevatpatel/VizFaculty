import mongoose from "mongoose";

const JournalPublicationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    email: { type: String, required: true },  // Added Email Field
    journalName: { type: String, required: true },
    volume: { type: String },
    issue: { type: String },
    pages: { type: String },
    year: { type: Number, required: true },
    doi: { type: String },
    impactFactor: { type: Number },
    abstract: { type: String },
    publicationStatus: { 
        type: String, 
        enum: ["pending", "approved"], 
        default: "pending"  // Ensuring default status is "pending"
    }
}, { timestamps: true });

const JournalPublication = mongoose.model("JournalPublication", JournalPublicationSchema);

export default JournalPublication;
