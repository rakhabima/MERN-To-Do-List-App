// server/services/habitService.js
const Habit = require('../models/Habit');

exports.getAllHabits = () => Habit.find().sort({ createdAt: -1 });

exports.createHabit = (name) => {
    const newHabit = new Habit({ name });
    return newHabit.save();
};

exports.toggleHabitToday = async (id) => {
    const habit = await Habit.findById(id);
    if (!habit) throw new Error('Habit not found');

    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize waktu ke 00:00:00

    const alreadyLogged = habit.dates.some(date =>
        new Date(date).getTime() === today.getTime()
    );

    if (alreadyLogged) {
        habit.dates = habit.dates.filter(date =>
            new Date(date).getTime() !== today.getTime()
        );
    } else {
        habit.dates.push(today);
    }

    return habit.save();
};

exports.deleteHabit = (id) => Habit.findByIdAndDelete(id);

exports.updateHabit = (id, data) => {
    return Habit.findByIdAndUpdate(id, { name: data.name }, { new: true });
};

