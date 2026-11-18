
const userModel = require("../models/user.model");
const OTPUtils = require("../utils/genrateOtp.utils.js");
const verificationModel = require("../models/verification.model.js");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/email.services.js");

const isUserExists = async (req, res) => {

    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
        return res.status(400).json({
            message: "Email is required"
        });
    }

    try {
        // Check user existence
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found. Enter a valid email address."
            });
        }

        // Generate OTP
        const otp = OTPUtils.generateOtp();

        const otpHtml = OTPUtils.otpHtml(otp);
        const subject = OTPUtils.subject;

        // Hash OTP
        const hashedOtp = await bcrypt.hash(String(otp), 10);

        // Send email
        await sendEmail(email, subject, otp, otpHtml);

        // Save or update OTP
        await verificationModel.findOneAndUpdate(
            { email },
            {
                HashedOtp: hashedOtp,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000)
            },
            {
                upsert: true,
                new: true
            }
        );

        return res.status(200).json({
            message: "Verification OTP sent successfully"
        });

    } catch (error) {
        console.error("Error while checking user existence:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = isUserExists;
