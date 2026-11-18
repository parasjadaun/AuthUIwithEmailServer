const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify()
    .then(() => {
        console.log("SMTP CONNECTION SUCCESSFUL");
    })
    .catch((error) => {
        console.error("SMTP CONNECTION FAILED");
        console.error("Error code:", error.code);
        console.error("Error command:", error.command);
        console.error("Error response:", error.response);
        console.error("Error message:", error.message);
    });



const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent successfully:", info.messageId);

    return {
      success: true,
      messageId: info.messageId,
    };

  } catch (error) {
    console.error("Email sending failed:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = sendEmail;




