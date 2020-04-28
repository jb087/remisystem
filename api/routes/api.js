const express = require('express');
const fetch = require('node-fetch');
const CronJob = require('cron').CronJob;

const router = express.Router();

const noteService = require('../service/noteService');
const reminderService = require('../service/reminderService');

const host = "http://localhost:9000/";
const getRemindersPath = host + "api/reminders";

router.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return response.status(200).json({});
    }
    next();
});

/**
 * @swagger
 * definitions:
 *   NewNote:
 *     type: object
 *     properties:
 *       title:
 *         type: string
 *       description:
 *         type: string
 *     required:
 *       - title
 *       - description
 *
 *   Note:
 *     allOf:
 *       - $ref: '#/definitions/NewNote'
 *       - type: object
 *         properties:
 *           id:
 *             type: string
 *             format: uuid
 *         required:
 *           - id
 *
 *   NewReminder:
 *     type: object
 *     properties:
 *       noteId:
 *         type: string
 *         format: uuid
 *       time:
 *         type: string
 *     required:
 *       - noteId
 *       - time
 *
 *   Reminder:
 *     allOf:
 *       - $ref: '#/definitions/NewReminder'
 *       - type: object
 *         properties:
 *           id:
 *             type: string
 *             format: uuid
 *         required:
 *           - id
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     description: It is used to get all notes
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Note'
 */
router.get('/notes', function (request, response, next) {
    noteService.getNotes(response);
});

/**
 * @swagger
 * /api/note:
 *   post:
 *     description: It is used to create note
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: note
 *         description: Note object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewNote'
 *     responses:
 *       200:
 *         description: Note successfully created
 *         schema:
 *           $ref: '#/definitions/Note'
 */
router.post('/note', function (request, response, next) {
    noteService.createNote(request.body, response);
});

/**
 * @swagger
 * /api/reminders:
 *   get:
 *     description: It is used to get all reminders
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Reminder'
 */
router.get('/reminders', function (request, response, next) {
    reminderService.getReminders(response);
});

/**
 * @swagger
 * /api/reminders/{noteId}:
 *   get:
 *     description: It is used to get all reminders by noteId
 *     parameters:
 *       - in: path
 *         name: noteId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id of the note to filter
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Reminder'
 */
router.get('/reminders/:noteId', function (request, response, next) {
    reminderService.getRemindersByNoteId(request.params.noteId, response);
});

/**
 * @swagger
 * /api/reminder:
 *   post:
 *     description: It is used to create reminder
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: reminder
 *         description: Reminder object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewReminder'
 *     responses:
 *       200:
 *         description: Reminder successfully created
 *         schema:
 *           $ref: '#/definitions/Reminder'
 */
router.post('/reminder', function (request, response, next) {
    reminderService.createReminder(request.body, response);
});

let jobs = new Map();

let job = new CronJob("0/2 * * * * *", function () {
    fetch(getRemindersPath, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
        .then(response => response.json())
        .then(reminders => runReminders(reminders));
}, null, true, 'Europe/Warsaw');
job.start();

function runReminders(reminders) {
    reminders.forEach(reminder => {
        if (jobs.get(reminder.id) === undefined) {
            let j = new CronJob(reminder.time, function () {
                console.log("JobId: " + reminder.id)
            }, null, true, 'Europe/Warsaw');
            j.start();

            jobs.set(reminder.id, j);
        }
    })
}

module.exports = router;
