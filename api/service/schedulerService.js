const express = require('express');
const fetch = require('node-fetch');
const schedule = require('node-schedule');

const router = express.Router();

const host = "http://localhost:9000/";
const getRemindersPath = host + "api/reminders";

const everyTwoSecond = "*/2 * * * * *";

let jobs = new Map();

schedule.scheduleJob(everyTwoSecond, function () {
    fetch(getRemindersPath, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then(response => response.json())
        .then(reminders => runReminders(reminders));
});

function runReminders(reminders) {
    reminders.forEach(reminder => {
        if (jobs.get(reminder.id) === undefined) {
            let job = schedule.scheduleJob(reminder.time, function () {
                console.log("JobId: " + reminder.id)
            });

            jobs.set(reminder.id, job);
        }
    })
}

module.exports = router;
