const bcrypt=require("bcryptjs");
const userModel=require("../models/user.model");

async function login(req,res){
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"Email and password are required"});
        }
        const user=await userModel.findOne({email}).select("+hashedPassword");
        if(!user){
            return res.status(400).json({message:"No User Exists with this email"});
        }
        const isMatch=await bcrypt.compare(password,user.hashedPassword);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }

       return res.status(200).json({message:"Login Successful", user:{
        _id: user._id,
    firstName: user.name.firstName,
    lastName: user.name.lastName,
    email: user.email
       }});
    }
    catch(error){
        console.error("Error during login:", error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}
module.exports=login;