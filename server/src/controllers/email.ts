import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";
import { SendEmail } from "../types/email";

export const sendEmail = async (data: SendEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: "Drou Electronics Store 💻", // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
};
