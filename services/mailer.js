const nodemailer = require('nodemailer');

// set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL_ID, 
        pass: process.env.EMAIL_PASSWORD
    }
});

// define function to send email notification
const sendEmail = (recipient, subject, body) => {
    const mailOptions = {
        from: process.env.SENDER_EMAIL, 
        to: recipient, 
        subject: subject, 
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${JSON.stringify(recipient)}: ${info.response}`);
        }
    });
};

module.exports = { sendEmail }