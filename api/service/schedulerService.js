const fetch = require('node-fetch');
const schedule = require('node-schedule');
const cronParser = require('cron-parser');
const _ = require('underscore');
const mailService = require('./mailService');

const host = "http://localhost:9000/";
const getRemindersPath = host + "api/reminders";

const everyTwoSecond = "*/2 * * * * *";

let jobs = new Map();

exports.startSchedulerService = () => {
    schedule.scheduleJob(everyTwoSecond, function () {
        fetch(getRemindersPath, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
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
    let job = schedule.scheduleJob(new Date(reminder.time), () => scheduledTask(reminder));

    jobs.set(reminder.id, job);
}

function scheduledTask(reminder) {
    console.log("JobId: " + reminder.id);
    mailService.sendReminderOnMail(reminder);
}

exports.deleteReminder = (id) => {
    jobs.get(id).cancel();
    jobs.delete(id);
};
