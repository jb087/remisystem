const nodemailer = require('nodemailer');
const admin = require("firebase-admin");
const firestore = admin.firestore();
require('dotenv').config();

const userSettingCollection = 'userSettings';
const sendEmailRemindersProperty = 'sendEmailReminders';

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
            sendReminderOnMail(note, user);
        })
        .catch(function(error) {
            console.log('Error fetching user data: ', error);
        });
};

function sendReminderOnMail(note, user) {
    firestore.collection(userSettingCollection)
        .doc(user.uid)
        .get()
        .then(snapshot => {
            if (snapshot.get(sendEmailRemindersProperty)) {
                sendMail(note, user);
            } else {
                console.log('Unable to send email due to disable this functionality.')
            }
        })
}

function sendMail(note, user) {
    let mailOptions = getMailOptions(note, user.email);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

function getMailOptions(note, userMail) {
    return {
        from: process.env.MAIL_LOGIN,
        to: userMail,
        subject: note.title,
        text: note.description
    };
}
