const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

let users = [];

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  users.push({ username, password });
  res.json({ message: 'Registered successfully' });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (user.password !== password) {
    return res.status(401).json({ error: 'Incorrect password' });
  }
  res.json({ message: 'Login successful' });
});

app.listen(5000, () => console.log('Server running on port 5000'));