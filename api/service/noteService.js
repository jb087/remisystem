const uuid = require('uuid');
const Note = require('../entity/Note');
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

exports.getNotes = (response) => {
    db.all("SELECT * FROM NOTE", function (error, result) {
        if (error) {
            throw error;
        }

        const notes = result.map(note => new Note(note.ID, note.TITLE, note.DESCRIPTION));
        response.status(200).json(notes);
    })
};

exports.createNote = (body, response) => {
    const note = new Note(uuid.v1(), body.title, body.description);

    db.run("INSERT INTO NOTE (ID, TITLE, DESCRIPTION) VALUES (?, ?, ?)", [note.id, note.title, note.description],
        function (error, result) {
            if (error) {
                throw error;
            }

            response.status(200).json(note);
        })
};

exports.deleteNoteWithReminders = (noteId, response) => {
    db.all("SELECT * FROM REMINDER WHERE NOTE_ID = ?", noteId, function (error, result) {
        if (error) {
            throw error;
        }

        result.forEach(reminder => schedulerService.deleteReminder(reminder.ID));

        deleteReminders(noteId, response);
    })
};

function deleteReminders(noteId, response) {
    db.run("DELETE FROM REMINDER WHERE NOTE_ID = ?", noteId, function (error) {
        if (error) {
            throw error;
        }

        deleteNote(noteId, response);
    })
}

function deleteNote(noteId, response) {
    db.run("DELETE FROM NOTE WHERE ID = ?", noteId, function (error) {
        if (error) {
            throw error;
        }

        response.sendStatus(200);
    })
}
