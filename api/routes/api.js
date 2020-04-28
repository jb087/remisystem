const express = require('express');
const router = express.Router();
const noteService = require('../service/noteService');

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

module.exports = router;
