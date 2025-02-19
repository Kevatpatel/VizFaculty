import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Adjust the path based on your project structure

const login = async (req, res) => {
 

  try {
    // Check if the user exists
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message:false, error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message:false,error: "wrong password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET, // Ensure you have a secret key in your .env file
      { expiresIn: "10h" } // Token validity duration
    );

    // Respond with the token and user details
    res.status(200).json({
      message: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: false,error:error.message });
  }
};
 const verify=(req,res)=>{
  return res.status(200).json({message:true,user:req.user})
 }
export { login,verify };
