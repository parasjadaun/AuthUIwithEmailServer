const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
name: {
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        default: ""
    }
},
email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: {
        validator: function(v) {
            return /\S+@\S+\.\S+/.test(v);
        },
        message: 'Please enter a valid email'
    }
},

hashedPassword: {
    type: String,
    required: true,
    select: false
}
},{timestamps:true});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;