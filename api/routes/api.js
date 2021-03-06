const express = require('express');
const authService = require('../service/authService');
const noteService = require('../service/noteService');
const reminderService = require('../service/reminderService');

const router = express.Router();

router.use(function (request, response, next) {
    //NOSONAR
    response.header('Access-Control-Allow-Origin', '*');
    //NOSONAR   
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (request.method === 'OPTIONS') {
        //NOSONAR
        response.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return response.status(200).json({});
    }
    next();
});

/**
 * @swagger
 * securityDefinitions:
 *   Bearer:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 * security:
 *   - bearerAuth: []
 *
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
 *           userId:
 *             type: string
 *         required:
 *           - id
 *           - userId
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
 *
 *   NewNoteWithReminders:
 *     type: object
 *     properties:
 *       note:
 *         $ref: '#/definitions/NewNote'
 *       reminders:
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             time:
 *               type: string
 *           required:
 *             - time
 *     required:
 *       - note
 *       - reminders
 *
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     security:
 *       - Bearer: []
 *     description: It is used to get all notes
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Note'
 *       401:
 *         description: Problem with authorization
 */
router.get('/notes', authService, function (request, response, next) {
    noteService.getNotes(response);
});

/**
 * @swagger
 * /api/note/{id}:
 *   get:
 *     security:
 *       - Bearer: []
 *     description: It is used to get note by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Id of the note to filter
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           $ref: '#/definitions/Note'
 *       401:
 *         description: Problem with authorization
 */
router.get('/note/:id', authService, function (request, response, next) {
    noteService.getNotesById(request.params.id, response);
});

/**
 * @swagger
 * /api/notes-by-user:
 *   get:
 *     security:
 *       - Bearer: []
 *     description: It is used to get all notes by authorized user
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           $ref: '#/definitions/Note'
 *       401:
 *         description: Problem with authorization
 */
router.get('/notes-by-user', authService, function (request, response, next) {
    noteService.getNotesByUser(request.user, response);
});

/**
 * @swagger
 * /api/note:
 *   post:
 *     security:
 *       - Bearer: []
 *     description: It is used to create note for authorized user
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
 *       401:
 *         description: Problem with authorization
 */
router.post('/note', authService, function (request, response, next) {
    noteService.createNote(request.body, request.user, response);
});

/**
 * @swagger
 * /api/note/{id}:
 *   put:
 *     security:
 *       - Bearer: []
 *     description: It is used to update note by noteId
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the note to update
 *       - name: note
 *         description: Note object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewNote'
 *     responses:
 *       200:
 *         description: Note successfully updated
 *       401:
 *         description: Problem with authorization
 */
router.put('/note/:id', authService, function (request, response, next) {
    noteService.updateNote(request, request.user, response);
});

/**
 * @swagger
 * /api/note/{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     description: It is used to remove note and reminders by noteId
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the note to remove
 *     responses:
 *       200:
 *         description: Note and reminders successfully removed
 *       401:
 *         description: Problem with authorization
 */
router.delete('/note/:id', authService, function (request, response, next) {
    noteService.deleteNoteWithReminders(request.params.id, response);
});

/**
 * @swagger
 * /api/reminders:
 *   get:
 *     security:
 *       - Bearer: []
 *     description: It is used to get all reminders
 *     responses:
 *       200:
 *         description: A successful response
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Reminder'
 *       401:
 *         description: Problem with authorization
 */
router.get('/reminders', authService, function (request, response, next) {
    reminderService.getReminders(response);
});

/**
 * @swagger
 * /api/note/{noteId}/reminders:
 *   get:
 *     security:
 *       - Bearer: []
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
 *       401:
 *         description: Problem with authorization
 */
router.get('/note/:noteId/reminders', authService, function (request, response, next) {
    reminderService.getRemindersByNoteId(request.params.noteId, response);
});

/**
 * @swagger
 * /api/reminder:
 *   post:
 *     security:
 *       - Bearer: []
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
 *       401:
 *         description: Problem with authorization
 */
router.post('/reminder', authService, function (request, response, next) {
    reminderService.createReminder(request.body, response);
});

/**
 * @swagger
 * /api/reminder/{id}:
 *   delete:
 *     security:
 *       - Bearer: []
 *     description: It is used to remove reminder by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the reminder to remove
 *     responses:
 *       200:
 *         description: Reminder successfully removed
 *       401:
 *         description: Problem with authorization
 */
router.delete('/reminder/:id', authService, function (request, response, next) {
    reminderService.deleteReminder(request.params.id, response);
});

/**
 * @swagger
 * /api/note-with-reminders:
 *   post:
 *     security:
 *       - Bearer: []
 *     description: It is used to create note with reminders
 *     parameters:
 *       - name: newNoteWithReminders
 *         description: Note with Reminders object
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewNoteWithReminders'
 *     responses:
 *       200:
 *         description: Note with Reminders successfully created
 *         schema:
 *            type: integer
 *            description: Id of the new note
 *       401:
 *         description: Problem with authorization
 */
router.post('/note-with-reminders', authService, function (request, response, next) {
    noteService.createNoteWithReminders(request.body, request.user, response);
});

module.exports = router;
