// server/models/Habit.js
const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dates: {
        type: [Date],
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model('Habit', habitSchema);
