const mongoose = require("mongoose");
const uuid = require("uuid");

const taskSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false 
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;