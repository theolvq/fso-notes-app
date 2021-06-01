const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

// TODO add mongoDB and mongoose
// TODO add dotenv config
// TODO add errorHandler
// TODO add requestLogger with morgan

let notes = [
  {
    content: 'I love coding',
    date: new Date('May 25, 2021').toLocaleDateString(),
    important: true,
    id: 1,
  },
  {
    content: 'HTML is easy',
    date: new Date('May 26, 2021').toLocaleDateString(),
    important: false,
    id: 2,
  },
  {
    content: 'JavaScript is fun',
    date: new Date('May 30, 2021').toLocaleDateString(),
    important: false,
    id: 3,
  },
  {
    content: 'CSS is tricky',
    date: new Date('May 29, 2021').toLocaleDateString(),
    important: true,
    id: 4,
  },
];

app.get('/', (req, res) => {
  res.send('<h1>Hello there </h1>');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server' });
});

app.get('/api/notes', (req, res) => {
  res.status(200).json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find(note => note.id === id);
  res.status(200).json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(200).json(notes);
});

app.put('/api/notes/:id', (req, res) => {
  const body = req.body;
  const updatedNote = {
    content: body.content,
    date: body.date,
    important: body.important,
    id: body.id,
  };

  res.status(200).json(updatedNote);
});

app.post('/api/notes', (req, res) => {
  const body = req.body;
  const note = {
    content: body.content,
    date: body.date,
    important: body.important,
    id: body.id,
  };

  notes = notes.concat(note);
  res.status(200).json(note);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
