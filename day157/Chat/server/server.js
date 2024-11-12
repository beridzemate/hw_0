// server/server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get messages
app.get('/messages', (req, res) => {
    fs.readFile('./messages.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading messages' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to post a new message
app.post('/messages', (req, res) => {
    const newMessage = req.body;
    fs.readFile('./messages.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading messages' });
        }
        const messages = JSON.parse(data);
        messages.push(newMessage);
        fs.writeFile('./messages.json', JSON.stringify(messages), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving message' });
            }
            res.status(201).json(newMessage);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
