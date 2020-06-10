const fetch = require('node-fetch');
const schedule = require('node-schedule');
const cronParser = require('cron-parser');
const _ = require('underscore');
const mailService = require('./mailService');
require('dotenv').config();

const host = process.env.API_URL;
const getRemindersPath = host + "api/reminders";
const getNoteByIdPath = host + "api/note/{id}";
const auth = "Bearer " + process.env.INTERNAL_BEARER;

const everyTwoSecond = "*/2 * * * * *";

let jobs = new Map();

exports.startSchedulerService = () => {
    schedule.scheduleJob(everyTwoSecond, function () {
        fetch(getRemindersPath, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            }
        })
            .then(response => response.json())
            .then(reminders => runReminders(reminders));
    });
};

function runReminders(reminders) {
    reminders.forEach(reminder => {
        if (jobs.get(reminder.id) === undefined) {
            addJob(reminder);
        }
    })
}

function addJob(reminder) {
    let validate = cronParser.parseString(reminder.time);
    if (_.isEmpty(validate.errors)) {
        scheduleCronJob(reminder);
    } else {
        scheduleDateJob(reminder);
    }
}

function scheduleCronJob(reminder) {
    let job = schedule.scheduleJob(reminder.time, () => scheduledTask(reminder));

    jobs.set(reminder.id, job);
}

function scheduleDateJob(reminder) {
    let job = schedule.scheduleJob(new Date(parseInt(reminder.time, 10)), () => scheduledTask(reminder));

    jobs.set(reminder.id, job);
}

function scheduledTask(reminder) {
    console.log("JobId: " + reminder.id);
    sendReminderOnMail(reminder);
}

function sendReminderOnMail(reminder) {
    fetch(getNoteByIdPath.replace("{id}", reminder.noteId), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        }
    })
        .then(response => response.json())
        .then(note => mailService.sendReminderOnMail(note));
}

exports.deleteReminder = (id) => {
    jobs.get(id).cancel();
    jobs.delete(id);
};
