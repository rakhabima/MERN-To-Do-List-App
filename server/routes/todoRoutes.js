const express = require('express');
const router = express.Router();
const {
    getTodos,
    createTodo,
    toggleTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', toggleTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
