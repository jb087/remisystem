const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD
    }
});

const mailOptions = {
    from: process.env.MAIL_LOGIN,
    to: 'jb087@op.pl',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

exports.sendReminderOnMail = (reminder) => {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
