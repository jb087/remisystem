const uuid = require('uuid');

const Reminder = require('../entity/Reminder');

const sqlite = require('sqlite3').verbose();
const dbPath = 'db/remisystem.sqlite';
let db = new sqlite.Database(dbPath, (error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log("Connected to remisystem database!");
    }
});

exports.getRemindersByNoteId = (noteId, response) => {
    db.all("SELECT * FROM REMINDER WHERE NOTE_ID = ?", noteId,  function (error, result) {
        if (error) {
            throw error;
        }

        const reminders = result.map(reminder => new Reminder(reminder.ID, reminder.NOTE_ID, reminder.TIME));

        response.status(200).json(reminders)
    })
};
