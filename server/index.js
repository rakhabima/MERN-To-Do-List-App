// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 6543;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const todoRoutes = require('./routes/todoRoutes');
const habitRoutes = require('./routes/habitRoutes');
const pomodoroRoutes = require('./routes/pomodoroRoutes');


// Connect ke MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Test route
app.get('/', (req, res) => {
    res.send('API is working');
});

app.use('/api/todos', todoRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/pomodoro', pomodoroRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
