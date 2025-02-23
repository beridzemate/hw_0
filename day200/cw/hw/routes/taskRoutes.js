const express = require('express');
const router = express.Router();

// Mock data
let tasks = [];

// GET /tasks - List tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// POST /tasks - Add task
router.post('/', (req, res) => {
    const task = req.body;
    tasks.push(task);
    res.status(201).json(task);
});

module.exports = router;
