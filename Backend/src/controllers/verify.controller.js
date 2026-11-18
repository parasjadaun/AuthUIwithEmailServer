const verificationModel = require("../models/verification.model");
const bcrypt = require("bcryptjs");

async function verifyOtp(req, res) {

    const email = req.body.email?.trim().toLowerCase();
    const { otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({
            message: "Email and OTP are required"
        });
    }

    try {

        // 1. Find valid, non-expired OTP
        const verificationRecord = await verificationModel.findOne({
            email,
            expiresAt: { $gt: new Date() }
        });

        if (!verificationRecord) {
            return res.status(404).json({
                message: "OTP expired or verification record not found."
            });
        }

        // 2. Compare OTP
        const isMatch = await bcrypt.compare(
            String(otp),
            verificationRecord.HashedOtp
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // 3. Delete OTP after successful verification
        await verificationModel.deleteOne({
            _id: verificationRecord._id
        });

        // 4. Return success
        return res.status(200).json({
            message: "OTP verified successfully"
        });

    } catch (error) {

        console.error("Error during OTP verification:", error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = verifyOtp;
