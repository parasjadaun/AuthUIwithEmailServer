const userModel=require("../models/user.model");
const bcrypt=require("bcryptjs");

const setNewPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
        return res.status(404).json({ message: "User not found With this email" });
    }
   
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    user.hashedPassword  = newHashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
}   

module.exports = setNewPassword;