// server/routes/pomodoroRoutes.js
const express = require('express');
const router = express.Router();
const {
    createSession,
    getHistory
} = require('../controllers/pomodoroController');

router.post('/', createSession);
router.get('/history', getHistory);

module.exports = router;
