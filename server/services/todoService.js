// server/services/todoService.js
const Todo = require('../models/Todo');

exports.getAllTodos = () => Todo.find().sort({ createdAt: -1 });

exports.createTodo = ({ title, description, dueDate, priority, category }) => {
    const newTodo = new Todo({ title, description, dueDate, priority, category });
    return newTodo.save();
};

exports.toggleTodoStatus = async (id) => {
    const todo = await Todo.findById(id);
    if (!todo) throw new Error('Todo not found');

    todo.status = todo.status === 'belum' ? 'selesai' : 'belum';
    return todo.save();
};

exports.updateTodo = (id, data) => {
    return Todo.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteTodoById = (id) => Todo.findByIdAndDelete(id);
