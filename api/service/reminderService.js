const uuid = require('uuid');
const Reminder = require('../entity/Reminder');
const schedulerService = require('../service/schedulerService');
const sqlite = require('sqlite3').verbose();

const dbPath = 'db/remisystem.sqlite';
let db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Connected to remisystem database!");
    }
});

exports.getReminders = (response) => {
    db.all("SELECT * FROM REMINDER", function (error, result) {
        if (error) {
            console.log(error);
            return response.status(500).send(error);
        }

        const reminders = result.map(reminder => new Reminder(reminder.ID, reminder.NOTE_ID, reminder.TIME));

        response.status(200).json(reminders)
    })
};

exports.getRemindersByNoteId = (noteId, response) => {
    db.all("SELECT * FROM REMINDER WHERE NOTE_ID = ?", noteId, function (error, result) {
        if (error) {
            console.log(error);
            return response.status(500).send(error);
        }

        const reminders = result.map(reminder => new Reminder(reminder.ID, reminder.NOTE_ID, reminder.TIME));

        response.status(200).json(reminders)
    })
};

exports.createReminder = (body, response) => {
    const reminder = new Reminder(uuid.v1(), body.noteId, body.time);

    db.run("INSERT INTO REMINDER (ID, NOTE_ID, TIME) VALUES (?, ?, ?)", [reminder.id, reminder.noteId, reminder.time],
        function (error) {
            if (error) {
                console.log(error);
                return response.status(500).send(error);
            }

            response.status(200).json(reminder);
        })
};

exports.deleteReminder = (id, response) => {
    db.run("DELETE FROM REMINDER WHERE ID = ?", id, function(error) {
        if (error) {
            console.log(error);
            return response.status(500).send(error);
        }

        if (process.env.NODE_ENV === 'dev') {
            schedulerService.deleteReminder(id);
        }

        response.sendStatus(200)
    })
};
