const uuid = require('uuid');
const Note = require('../entity/Note');
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

exports.getNotes = (response) => {
    db.all("SELECT * FROM NOTE", function (error, result) {
        if (error) {
            throw error;
        }

        const notes = result.map(note => new Note(note.ID, note.USER_ID, note.TITLE, note.DESCRIPTION));
        response.status(200).json(notes);
    })
};

exports.getNotesById = (id, response) => {
    db.all("SELECT * FROM NOTE WHERE ID = ?", id, function (error, result) {
        if (error) {
            throw error;
        }

        const notes = result.map(note => new Note(note.ID, note.USER_ID, note.TITLE, note.DESCRIPTION));
        response.status(200).json(notes[0]);
    })
};

exports.getNotesByUser = (user, response) => {
    db.all("SELECT * FROM NOTE WHERE USER_ID = ?", user.uid, function (error, result) {
        if (error) {
            throw error;
        }

        const notes = result.map(note => new Note(note.ID, note.USER_ID, note.TITLE, note.DESCRIPTION));
        response.status(200).json(notes);
    })
};

exports.createNote = (body, user, response) => {
    const note = new Note(uuid.v1(), user.uid, body.title, body.description);

    db.run("INSERT INTO NOTE (ID, USER_ID, TITLE, DESCRIPTION) VALUES (?, ?, ?, ?)", [note.id, note.userId, note.title, note.description],
        function (error, result) {
            if (error) {
                throw error;
            }

            response.status(200).json(note);
        })
};

exports.updateNote = (request, user, response) => {
    const note = new Note(request.params.id, user.uid, request.body.title, request.body.description);

    db.run("UPDATE NOTE SET TITLE = ?, DESCRIPTION = ? WHERE ID = ? AND USER_ID = ?",
        [note.title, note.description, note.id, note.userId], function (error) {
            if (error) {
                throw error;
            }

            response.sendStatus(200);
        })
};

exports.deleteNoteWithReminders = (noteId, response) => {
    db.all("SELECT * FROM REMINDER WHERE NOTE_ID = ?", noteId, function (error, result) {
        if (error) {
            throw error;
        }

        if (process.env.NODE_ENV === 'dev') {
            result.forEach(reminder => schedulerService.deleteReminder(reminder.ID));
        }

        if (result.length === 0) {
            deleteNote(noteId, response);
        } else {
            deleteReminders(noteId, response);
        }
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

exports.createNoteWithReminders = (body, user, response) => {
    const note = new Note(uuid.v1(), user.uid, body.note.title, body.note.description);

    db.run("INSERT INTO NOTE (ID, USER_ID, TITLE, DESCRIPTION) VALUES (?, ?, ?, ?)", [note.id, note.userId, note.title, note.description],
        async function (error, result) {
            if (error) {
                throw error;
            }

            await createReminders(body, note);

            response.status(200).json(note.id);
        })
};

function createReminders(body, note) {
    body.reminders.forEach(reminder => {
        const newReminder = new Reminder(uuid.v1(), note.id, reminder.time);

        db.run("INSERT INTO REMINDER (ID, NOTE_ID, TIME) VALUES (?, ?, ?)", [newReminder.id, newReminder.noteId, newReminder.time],
            function (error) {
                if (error) {
                    throw error;
                }
            })
    })
}
