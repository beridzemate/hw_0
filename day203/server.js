const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, process.env.DATA_FILE || 'tasks.json');

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const readTasks = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

const writeTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// CRUD Endpoints
app.get('/tasks', (req, res) => {
    const tasks = readTasks();
    const { completed } = req.query;
    if (completed !== undefined) {
        const filteredTasks = tasks.filter(task => String(task.completed) === completed);
        return res.json(filteredTasks);
    }
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const tasks = readTasks();
    const newTask = {
        id: String(Date.now()),
        title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const { title, completed } = req.body;
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    if (title !== undefined) tasks[taskIndex].title = title;
    if (completed !== undefined) tasks[taskIndex].completed = completed;
    writeTasks(tasks);
    res.json(tasks[taskIndex]);
});

app.delete('/tasks/:id', (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    writeTasks(tasks);
    res.json(deletedTask[0]);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});