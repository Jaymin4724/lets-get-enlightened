import Emails from "../models/REGISTRATION_TBL.js";
import Registration from "../models/REGISTRATION_TBL.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const generateOTP = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const emailExist = await Emails.findOne({ email: email });
    if (!emailExist) {
      return res.status(404).json({ msg: "Email not found" });
    } else {
      const otp = generateOTP();

      // Create nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        debug: true,
      });

      // Email message
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your OTP for verification",
        text: `
        Dear Meditator,
        We understand that forgetting passwords can happen to anyone. 
        Here is your one-time verification code to reset your password: ${otp}
        Best Regards,
        Let's Get Enlightened.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ message: "Email sending failed" });
        } else {
          return res
            .status(200)
            .json({ message: "Email sent successfully", otp, email });
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Registration.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    user.password = password;
    await user.save();
    res.status(200).json({ msg: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
