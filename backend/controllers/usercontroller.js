import User from "../models/user.js"; // Adjust the path based on your structure

// Controller to fetch user profile by email
export const getUserProfile = async (req, res) => {
    try {
        const userEmail = req.query.email; // Extract email from query parameter

        if (!userEmail) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Fetch user details excluding profileImage and password
        const user = await User.findOne({ email: userEmail }).select("-profileImage -password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
