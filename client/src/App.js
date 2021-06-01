import noteService from './services/notes';
import { useEffect, useState } from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleChange = e => {
    const { value, type, checked } = e.target;
    type === 'checkbox' ? setIsImportant(checked) : setNewNote(value);
  };

  const generateId = () => {
    return Math.max(...notes.map(note => note.id)) + 1;
  };

  const addNote = e => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: isImportant,
      id: generateId(),
    };
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
        setIsImportant(false);
      })
      .catch(err => console.log(err));
  };

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(updatedNote, id)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  return (
    <div>
      <h1>Bestest note app you can find</h1>
      <ul>
        {notes.map(note => (
          <Note key={note.id} note={note} toggleImportance={toggleImportance} />
        ))}
      </ul>
      <NoteForm
        newNote={newNote}
        isImportant={isImportant}
        handleChange={handleChange}
        addNote={addNote}
      />
    </div>
  );
}

export default App;
