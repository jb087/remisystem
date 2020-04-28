const express = require('express');
const fetch = require('node-fetch');
const CronJob = require('cron').CronJob;

const router = express.Router();

const host = "http://localhost:9000/";
const getRemindersPath = host + "api/reminders";

const everyTwoSecond = "0/2 * * * * *";

let jobs = new Map();

new CronJob(everyTwoSecond, function () {
    fetch(getRemindersPath, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then(response => response.json())
        .then(reminders => runReminders(reminders));
}, null, true, 'Europe/Warsaw').start();

function runReminders(reminders) {
    reminders.forEach(reminder => {
        if (jobs.get(reminder.id) === undefined) {
            let job = new CronJob(reminder.time, function () {
                console.log("JobId: " + reminder.id)
            }, null, true, 'Europe/Warsaw');
            job.start();

            jobs.set(reminder.id, job);
        }
    })
}

module.exports = router;
