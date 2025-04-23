// server/services/pomodoroService.js
const PomodoroSession = require('../models/PomodoroSession');

exports.logSession = (data) => {
    const session = new PomodoroSession(data);
    return session.save();
};

exports.getHistory = () => {
    return PomodoroSession.find().sort({ createdAt: -1 });
};
