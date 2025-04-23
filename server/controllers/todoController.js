const todoService = require('../services/todoService');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

exports.getTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();
        successResponse(res, "Todos retrieved successfully", todos);
    } catch (err) {
        errorResponse(res, "Failed to get todos", err.message);
    }
};

exports.createTodo = async (req, res) => {
    try {
        const newTodo = await todoService.createTodo(req.body);
        successResponse(res, "Todo created successfully", newTodo, 201);
    } catch (err) {
        errorResponse(res, "Failed to create todo", err.message, 400);
    }
};

exports.toggleTodo = async (req, res) => {
    try {
        const updated = await todoService.toggleTodoStatus(req.params.id);
        successResponse(res, "Todo status updated", updated);
    } catch (err) {
        errorResponse(res, "Failed to toggle status", err.message, 400);
    }
};

exports.updateTodo = async (req, res) => {
    try {
        const updated = await todoService.updateTodo(req.params.id, req.body);
        successResponse(res, "Todo updated successfully", updated);
    } catch (err) {
        errorResponse(res, "Failed to update todo", err.message, 400);
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await todoService.deleteTodoById(req.params.id);
        successResponse(res, "Todo deleted successfully");
    } catch (err) {
        errorResponse(res, "Failed to delete todo", err.message, 400);
    }
};
