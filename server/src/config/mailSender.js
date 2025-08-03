const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

exports.mailSender = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    return await transporter.sendMail({
      from: `"ProConnect" <${process.env.MAIL_USER}>`,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.log("Error in mail sending:", error.message);
  }
};
