// server/controllers/pomodoroController.js
const pomodoroService = require('../services/pomodoroService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

exports.createSession = async (req, res) => {
    try {
        const newSession = await pomodoroService.logSession(req.body);
        successResponse(res, "Pomodoro session logged", newSession, 201);
    } catch (err) {
        errorResponse(res, "Failed to log session", err.message, 400);
    }
};

exports.getHistory = async (req, res) => {
    try {
        const history = await pomodoroService.getHistory();
        successResponse(res, "Pomodoro history retrieved", history);
    } catch (err) {
        errorResponse(res, "Failed to fetch history", err.message);
    }
};
