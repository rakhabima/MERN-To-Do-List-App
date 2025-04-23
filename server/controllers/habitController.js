// server/controllers/habitController.js
const habitService = require('../services/habitService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

exports.getHabits = async (req, res) => {
    try {
        const habits = await habitService.getAllHabits();
        successResponse(res, "Habits retrieved successfully", habits);
    } catch (err) {
        errorResponse(res, "Failed to get habits", err.message);
    }
};

exports.createHabit = async (req, res) => {
    try {
        const newHabit = await habitService.createHabit(req.body.name);
        successResponse(res, "Habit created successfully", newHabit, 201);
    } catch (err) {
        errorResponse(res, "Failed to create habit", err.message, 400);
    }
};

exports.toggleHabitToday = async (req, res) => {
    try {
        const updated = await habitService.toggleHabitToday(req.params.id);
        successResponse(res, "Habit updated for today", updated);
    } catch (err) {
        errorResponse(res, "Failed to update habit", err.message, 400);
    }
};

exports.deleteHabit = async (req, res) => {
    try {
        await habitService.deleteHabit(req.params.id);
        successResponse(res, "Habit deleted successfully");
    } catch (err) {
        errorResponse(res, "Failed to delete habit", err.message, 400);
    }
};

exports.updateHabit = async (req, res) => {
    try {
        const updated = await habitService.updateHabit(req.params.id, req.body);
        successResponse(res, "Habit name updated successfully", updated);
    } catch (err) {
        errorResponse(res, "Failed to update habit name", err.message, 400);
    }
};

