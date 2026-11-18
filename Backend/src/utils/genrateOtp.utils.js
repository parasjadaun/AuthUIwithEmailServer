const crypto = require("crypto");

// Generate a fresh 6-digit OTP on every call
function generateOtp() {
    return crypto.randomInt(100000, 1000000).toString();
}

function otpHtml(otp) {
    return `
    <div style="
      margin: 0;
      padding: 40px 15px;
      background-color: #f4f4f5;
      font-family: Arial, Helvetica, sans-serif;
    ">
      <div style="
        max-width: 480px;
        margin: auto;
        background-color: #ffffff;
        border-radius: 12px;
        overflow: hidden;
        border: 1px solid #e4e4e7;
      ">

        <!-- Header -->
        <div style="
          background-color: #18181b;
          padding: 25px;
          text-align: center;
        ">
          <h1 style="
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
          ">
            Account Verification
          </h1>
        </div>

        <!-- Content -->
        <div style="padding: 35px 30px; text-align: center;">

          <h2 style="
            color: #18181b;
            font-size: 22px;
            margin: 0 0 15px;
          ">
            Verify Your Email
          </h2>

          <p style="
            color: #52525b;
            font-size: 15px;
            line-height: 1.6;
            margin-bottom: 25px;
          ">
            Thank you for creating an account!
            Use the verification code below to complete
            your registration.
          </p>

          <!-- OTP Box -->
          <div style="
            background-color: #f4f4f5;
            border: 1px dashed #a1a1aa;
            border-radius: 10px;
            padding: 20px;
            margin: 25px 0;
          ">
            <p style="
              color: #71717a;
              font-size: 12px;
              margin: 0 0 10px;
              text-transform: uppercase;
              letter-spacing: 2px;
            ">
              Your Verification Code
            </p>

            <h1 style="
              color: #18181b;
              font-size: 36px;
              letter-spacing: 10px;
              margin: 0;
            ">
              ${otp}
            </h1>
          </div>

          <p style="
            color: #71717a;
            font-size: 14px;
            line-height: 1.6;
          ">
            This OTP is valid for <strong>5 minutes</strong>.
            Please do not share this code with anyone.
          </p>

          <p style="
            color: #52525b;
            font-size: 14px;
            margin-top: 25px;
          ">
            If you didn't request this verification,
            you can safely ignore this email.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background-color: #fafafa;
          border-top: 1px solid #e4e4e7;
          padding: 18px;
          text-align: center;
        ">
          <p style="
            color: #a1a1aa;
            font-size: 12px;
            margin: 0;
          ">
            © 2026 Your Application. All rights reserved.
          </p>
          <p style="
            color: #a1a1aa;
            font-size: 11px;
            margin: 8px 0 0;
          ">
            This is an automated email. Please do not reply.
          </p>
        </div>

      </div>
    </div>
    `
}

const subject = 'Your OTP for verification';

module.exports = { generateOtp, otpHtml, subject };
