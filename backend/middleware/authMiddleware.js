import jwt from 'jsonwebtoken'
import User from '../models/User.js';
const verifyUser =async (req,res,next)=>{
    try{
          const token = req.headers.authorization.split(' ')[1];
          if(!token){
            return res.status(404).json({message:false,error:"token not provided"})
          }
          const decoded =  jwt.verify(token,process.env.JWT_SECRET)
          if(!decoded){
            return res.status(404).json({message:false,error:"token not valid"})
          }
          const user = await User.findById({_id:decoded._id}).select('-password')
          if(!user){
            return res.status(404).json({message:false,error:"user not valid"})
          }
          req.user=user
          next()
    }catch(error){
        return res.status(500).json({message:false,error:"server error"})
    }
}
export default verifyUser