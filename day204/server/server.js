const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const readNotes = () => {
  try {
    const data = fs.readFileSync('notes.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []; 
    } else {
      throw err;
    }
  }
};


const writeNotes = (notes) => {
  fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
};


app.get('/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});


app.post('/notes', (req, res) => {
  const notes = readNotes();
  const newNote = {
    id: notes.length ? notes[notes.length - 1].id + 1 : 1,
    title: req.body.title,
    content: req.body.content,
    createdAt: new Date().toISOString(),
  };
  notes.push(newNote);
  writeNotes(notes);
  res.status(201).json(newNote);
});

app.put('/notes/:id', (req, res) => {
  const notes = readNotes();
  const id = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes[index] = { ...notes[index], ...req.body };
    writeNotes(notes);
    res.json(notes[index]);
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});


app.delete('/notes/:id', (req, res) => {
  const notes = readNotes();
  const id = parseInt(req.params.id);
  const index = notes.findIndex(note => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    writeNotes(notes);
    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});


app.get('/', (req, res) => {
  res.send('Notes App Backend');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});