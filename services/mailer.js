const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT, // or 587 if using TLS
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const sendEmail = async (to, subject, template, data) => {
  try {
    const emailTemplate = await ejs.renderFile(path.join(__dirname, 'templates', template), data);

    const mailOptions = {
      from: "Miki Rent <info@mikirent.com>",
      to,
      subject,
      html: emailTemplate,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  } catch (error) {
    console.log(error)
  }
};

module.exports = { sendEmail };
