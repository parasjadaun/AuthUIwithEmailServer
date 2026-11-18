const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const sendEmail = require("../services/email.services");

async function register(req, res) {
    try {
        const { name: { firstName,  lastName}, email, password ,mobileNumber} = req.body;

        if (!firstName || !email || !password) {
              return res.status(400).json({ message: "First name, email, and password are required." });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists Please choose a different email." });
        }
        const newUser = await  userModel.create({
            name: { firstName, lastName },
            email,
            hashedPassword: await bcrypt.hash(password, 10),
        })
        const registrationHTML=`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="
  margin: 0;
  padding: 30px 15px;
  background-color: #f3f4f6;
  font-family: Arial, Helvetica, sans-serif;
">

  <div style="
    max-width: 550px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  ">

    <!-- Header -->
    <div style="
      background-color: #2563eb;
      padding: 35px 20px;
      text-align: center;
    ">
      <h1 style="
        color: #ffffff;
        font-size: 26px;
        margin: 0;
        font-weight: 700;
      ">
        Welcome Aboard!
      </h1>

      <p style="
        color: #dbeafe;
        font-size: 14px;
        margin: 10px 0 0;
      ">
        We're glad to have you with us.
      </p>
    </div>

    <!-- Main Content -->
    <div style="padding: 35px 30px;">

      <h2 style="
        color: #111827;
        font-size: 21px;
        margin: 0 0 18px;
      ">
        Hello ${firstName}!
      </h2>

      <p style="
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
        margin: 0 0 15px;
      ">
        Thank you for registering with us.
        Your account has been successfully created.
      </p>

      <p style="
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
        margin: 0 0 25px;
      ">
        We're excited to have you on board.
        Get started and explore everything our platform
        has to offer!
      </p>

      <div style="
        background-color: #eff6ff;
        border-left: 4px solid #2563eb;
        padding: 15px;
        border-radius: 5px;
        margin-bottom: 25px;
      ">
        <p style="
          color: #1e40af;
          font-size: 14px;
          margin: 0;
          line-height: 1.6;
        ">
          Your journey starts here. We're looking forward
          to being part of it!
        </p>
      </div>

      <p style="
        color: #374151;
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
      ">
        Best Regards,<br>
        <strong style="color: #111827;">
          The Developer Team
        </strong>
      </p>

    </div>

    <!-- Footer -->
    <div style="
      background-color: #f9fafb;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    ">
      <p style="
        color: #9ca3af;
        font-size: 12px;
        margin: 0;
      ">
        This is an automated email. Please do not reply.
      </p>
    </div>

  </div>

</body>
        </html>`

        const emailSubject = "Welcome to Our Platform!";

       await sendEmail(email, emailSubject, "Welcome to Our Platform!", registrationHTML);

       return  res.status(201).json({ message: "User registered successfully", user: {
        firstName: newUser.name.firstName,
        lastName: newUser.name.lastName,
        email: newUser.email,
        mobileNumber: newUser.mobileNumber
       }});
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports =  register ;