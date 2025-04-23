// server/models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum: ['belum', 'selesai'],
        default: 'belum'
    },

    dueDate: Date,

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },

    category: {
        type: String,
        default: ''
    },

    userId: {
        type: String, // nanti bisa diganti ObjectId kalau pakai User model
        required: false
    },

    userId: {
        type: String,
        required: false
    },


}, { timestamps: true }); // Otomatis buat createdAt & updatedAt

module.exports = mongoose.model('Todo', todoSchema);
