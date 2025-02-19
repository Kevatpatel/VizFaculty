import mongoose from "mongoose";

const PublicationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    authors: { type: String, required: true },
    journal: { type: String, required: true },
    year: { type: Number, required: true },
    doi: { type: String, default: "" },
    abstract: { type: String, default: "" },
    status: { type: String, enum: ["pending", "approved"], default: "pending" }, // Status field added
  },
  { timestamps: true }
);

const Publication = mongoose.model("Publication", PublicationSchema);
export default Publication;
