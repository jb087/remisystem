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

router.get('/notes', function (request, response, next) {
    noteService.getNotes(response)
});

module.exports = router;
