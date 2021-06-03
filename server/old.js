// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const Note = require('./models/note');

// const app = express();

// app.use(express.static('./client/build'));
// app.use(express.json());
// app.use(cors());

// morgan.token('body', req => JSON.stringify(req.body));
// app.use(morgan(':method :url :response-time ms :body'));

// app.get('/api/notes', (req, res) => {
//   Note.find({}).then(notes => {
//     res.json(notes);
//   });
// });

// app.get('/api/notes/:id', (req, res, next) => {
//   Note.findById(req.params.id)
//     .then(note => (note ? res.json(note) : res.status(404).end()))
//     .catch(err => next(err));
// });

// app.delete('/api/notes/:id', (req, res, next) => {
//   Note.findByIdAndRemove(req.params.id)
//     .then(() => {
//       res.status(204).end();
//     })
//     .catch(err => next(err));
// });

// app.put('/api/notes/:id', (req, res, next) => {
//   const body = req.body;

//   const note = {
//     content: body.content,
//     date: body.date,
//     important: body.important,
//   };

//   Note.findByIdAndUpdate(req.params.id, note, { new: true })
//     .then(updatedNote => res.json(updatedNote))
//     .catch(err => next(err));
// });

// app.post('/api/notes', (req, res, next) => {
//   const body = req.body;
//   const note = new Note({
//     content: body.content,
//     date: body.date,
//     important: body.important,
//   });
//   note
//     .save()
//     .then(savedNote => {
//       res.json(savedNote);
//     })
//     .catch(err => next(err));
// });

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' });
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message });
//   }

//   next(error);
// };

// app.use(errorHandler);
// const unknownEndpoint = (req, res) => {
//   res.status(404).send({ error: 'unknown endpoint' });
// };

// app.use(unknownEndpoint);

// const PORT = process.env.PORT;

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// let notes = [
//   {
//     content: 'I love coding',
//     date: new Date('May 25, 2021').toLocaleDateString(),
//     important: true,
//     id: 1,
//   },
//   {
//     content: 'HTML is easy',
//     date: new Date('May 26, 2021').toLocaleDateString(),
//     important: false,
//     id: 2,
//   },
//   {
//     content: 'JavaScript is fun',
//     date: new Date('May 30, 2021').toLocaleDateString(),
//     important: false,
//     id: 3,
//   },
//   {
//     content: 'CSS is tricky',
//     date: new Date('May 29, 2021').toLocaleDateString(),
//     important: true,
//     id: 4,
//   },
// ];
