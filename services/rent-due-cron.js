const cron = require('node-cron');
const nodemailer = require('nodemailer');

// set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com', // your gmail account email
        pass: 'your_password' // your gmail account password
    }
});

// define function to send email notification
const sendEmail = (tenantName, tenantEmail) => {
    const mailOptions = {
        from: 'your_email@gmail.com', // sender email address
        to: tenantEmail, // recipient email address
        subject: 'Rent payment reminder', // email subject
        text: `Dear ${tenantName},\n\nThis is a friendly reminder that your rent payment is due soon. Please ensure that your payment is made on time to avoid any late fees.\n\nThank you for your prompt attention to this matter.\n\nBest regards,\nYour Landlord` // email message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Email sent to ${tenantName} at ${tenantEmail}: ${info.response}`);
        }
    });
};

// set up cron job to check for rent due dates every day at 9:00am
cron.schedule('0 9 * * *', () => {
    // get list of tenants from database (replace with your own code)
    const tenants = [
        { name: 'John Doe', email: 'johndoe@gmail.com', rentDueDate: new Date('2023-05-05') },
        { name: 'Jane Smith', email: 'janesmith@gmail.com', rentDueDate: new Date('2023-05-10') },
        { name: 'Bob Johnson', email: 'bobjohnson@gmail.com', rentDueDate: new Date('2023-05-15') }
    ];

    // loop through tenants and check if their rent is about due
    tenants.forEach((tenant) => {
        const daysUntilRentDue = Math.ceil((tenant.rentDueDate - new Date()) / (1000 * 60 * 60 * 24));

        if (daysUntilRentDue <= 5) { // send email notification if rent is due within 5 days
            sendEmail(tenant.name, tenant.email);
        }
    });
});
