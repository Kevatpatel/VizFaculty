import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "employee"], required: true },
    maritalStatus: { type: String, default: "Single" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Prevent model overwrite error
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
