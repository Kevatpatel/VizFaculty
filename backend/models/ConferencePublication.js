import mongoose from "mongoose";

const conferencePublicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: [String], required: true },
    conferenceName: { type: String, required: true },
    conferenceLocation: { type: String, required: true },
    conferenceDate: { type: Date, required: true },
    pages: { type: String },
    year: { type: Number, required: true },
    doi: { type: String },
    publicationType: { 
      type: String, 
      enum: ["full-paper", "short-paper", "poster", "extended-abstract"], 
      required: true 
    },
    presentationType: { 
      type: String, 
      enum: ["oral", "poster", "virtual"], 
      required: true 
    },
    abstract: { type: String },
    status: { type: String, enum: ["pending", "approved"], default: "pending" },
    facultyEmail: { type: String, required: true } // Track faculty submission
  },
  { timestamps: true }
);

const ConferencePublication = mongoose.model("ConferencePublication", conferencePublicationSchema);

export default ConferencePublication;
