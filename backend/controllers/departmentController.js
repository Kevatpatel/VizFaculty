import Department from "../models/Department.js";

const getDepartments = async(req,res)=>{
    try{
         const departments=await Department.find()
         return res.status(200).json({message:true,departments})
    }catch(error){
        return res.status(500).json({message:false,error:"getdepartmentservererrorr"})
    }
}

const addDepartment = async(req,res)=>{
    try{
        const {dep_name,description}=req.body;
        const newDep = new Department({
            dep_name,description
        })
        await newDep.save()
        return res.status(200).json({message:true,department:newDep})
    }catch(error){
        return res.status(500).json({message:false,error:"adddepartment server error"})
    }

}
const getDepartment = async(req,res)=>{
    try{
          const {id}=req.params;
          const department=await Department.findById({_id:id})
          return res.status(200).json({message:true,department})
    }catch(error){
        return res.status(500).json({message:false,error:"adddepartment server error"})
    }
}

const updateDepartment = async(req,res)=>{
      try{
          const {id}=req.params;
          const {dep_name,description}=req.body;
          const updateDep = await Department.findByIdAndUpdate({_id:id},{
            dep_name,description
          })
          return res.status(200).json({message:true,updateDep})
      }catch(error){
        return res.status(500).json({message:false,error:"edit department server error"})
    }
}
const deleteDepartment = async(req,res)=>{
    try{
         const {id}=req.params;
         const deletedep=await Department.findByIdAndDelete({_id:id})
         return res.status(200).json({message:true,deletedep})
    }catch(error){
           return res.status(500).json({message:false,error:"dele dep error"})
    }
}
export {addDepartment,getDepartments,getDepartment,updateDepartment,deleteDepartment}