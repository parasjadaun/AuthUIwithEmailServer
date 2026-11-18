const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    HashedOtp:{
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true,
        index: { expires: 0 } 
    }
}, { timestamps: true});

const verificationModel = mongoose.model("Verification", verificationSchema);

module.exports = verificationModel;