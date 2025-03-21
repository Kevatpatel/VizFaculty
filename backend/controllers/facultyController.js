import Faculty from "../models/Faculty.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import multer from'multer'
import path from "path"

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,"public/uploads")
    },
    filename:(req,file,cb) =>{ //for assigning unique name we use this 
        cb(null,Date.now() + path.extname(file.originalname))
    }

})

const upload = multer({storage:storage})

const addFaculty = async(req,res) =>{

    try{

    const{
        name,
        email,
        FacultyId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary,
        password,
        role,
    }=req.body;

    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message : false , error:"user already registered"})
    }

    const hashPassword = await bcrypt.hash(password,10)

    const newUser  = new User({
        name,
        email,
        password:hashPassword,
        role,
        profileImage:req.file ? req.file.filename:"",
        maritalStatus
        

    })
    const savedUser = await newUser.save()

    const newFaculty = new Faculty({
        userId: savedUser._id,
        FacultyId,
        dob,
        gender,
        maritalStatus,
        designation,
        department,
        salary
    })

    await newFaculty.save()
    return res.status(200).json({message: true,message1:"employee created"})
    }catch(error){
        return res.status(500).json({message: false,message1:"server error in adding employee"})
    }
}

const getFaculties= async(req,res) =>{
    try {
        const faculties = await Faculty.find().populate('userId',{password:0}).populate("department")
        return res.status(200).json({ message: true, faculties })
    } catch (error) {
        return res.status(500).json({ message: false, error: "get faculties server error" })
    }
}
const getFaculty = async(req,res) =>{
    const {id} = req.params;

    try {
        const faculty = await Faculty.findById({_id:id}).populate('userId',{password:0}).populate("department")
        
        return res.status(200).json({ message: true, faculty})
    } catch (error) {
        return res.status(500).json({ message: false, error: "get employees server error" })
    }
}

const getFacultyByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: false, error: "User not found" });
        }

        // Find faculty details using userId
        const faculty = await Faculty.findOne({ userId: user._id })
            .populate("userId", { password: 0 })
            .populate("department");

        if (!faculty) {
            return res.status(404).json({ message: false, error: "Faculty profile not found" });
        }

        return res.status(200).json({ message: true, faculty });
    } catch (error) {
        console.error("Error fetching faculty profile by email:", error);
        return res.status(500).json({ message: false, error: "Server error while fetching faculty profile" });
    }
};



export {addFaculty,upload,getFaculties,getFaculty,getFacultyByEmail}