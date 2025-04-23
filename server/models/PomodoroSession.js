// server/models/PomodoroSession.js
const mongoose = require('mongoose');

const pomodoroSessionSchema = new mongoose.Schema({
    userId: {
        type: String, // Bisa diganti ObjectId kalau nanti ada auth
        default: null
    },
    type: {
        type: String,
        enum: ['focus', 'break'],
        required: true
    },
    duration: {
        type: Number, // dalam menit
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PomodoroSession', pomodoroSessionSchema);
