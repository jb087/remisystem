const express = require('express');
const router = express.Router();
const noteService = require('../service/noteService');
const reminderService = require('../service/reminderService');

router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json({});
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
    noteService.getNotes(response)
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
    noteService.createNote(request.body, response)
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
    reminderService.getRemindersByNoteId(request.params.noteId, response)
});

module.exports = router;
