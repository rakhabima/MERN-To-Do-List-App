// server/routes/habitRoutes.js
const express = require('express');
const router = express.Router();
const {
    getHabits,
    createHabit,
    toggleHabitToday,
    deleteHabit,
    updateHabit
} = require('../controllers/habitController');

router.get('/', getHabits);
router.post('/', createHabit);
router.patch('/:id', toggleHabitToday);
router.delete('/:id', deleteHabit);
router.put('/:id', updateHabit);


module.exports = router;
