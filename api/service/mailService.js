const nodemailer = require('nodemailer');
const admin = require("firebase-admin");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_LOGIN,
        pass: process.env.MAIL_PASSWORD
    }
});

exports.sendReminderOnMail = (note) => {
    admin.auth().getUser(note.userId)
        .then(user => {
            let mailOptions = getMailOptions(note, user.email);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        })
        .catch(function(error) {
            console.log('Error fetching user data: ', error);
        });
};

function getMailOptions(note, userMail) {
    return {
        from: process.env.MAIL_LOGIN,
        to: userMail,
        subject: note.title,
        text: note.description
    };
}
