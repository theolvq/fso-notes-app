import noteService from './services/notes';
import { useEffect, useState } from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ShowButton from './components/ShowButton';
import loginService from './services/login';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setIsImportant(checked);
    } else {
      switch (name) {
        case 'newNote':
          setNewNote(value);
          break;
        case 'username':
          setUsername(value);
          break;
        case 'password':
          setPassword(value);
          break;
        default:
          break;
      }
    }
  };

  const addNote = e => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: isImportant,
    };
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setMessage('Note added');
        setTimeout(() => setMessage(null), 5000);
        setNewNote('');
        setIsImportant(false);
      })
      .catch(err => {
        setMessage(`The following error occured: ${err}`);
        setTimeout(() => setMessage(null), 5000);
      });
  };

  const toggleImportance = id => {
    const note = notes.find(note => note.id === id);
    const updatedNote = { ...note, important: !note.important };

    noteService
      .update(updatedNote, id)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
        setMessage(`Note Updated`);
        setTimeout(() => setMessage(null), 5000);
      })
      .catch(err => {
        setMessage(`The following error occured: ${err}`);
        setTimeout(() => setMessage(null), 5000);
      });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedInNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('Error: wrong credentials');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Bestest note app you can find</h1>
      {message && <Notification message={message} />}
      {user ? (
        <>
          {' '}
          <p>Welcome {user.name}</p>
          <NoteForm
            newNote={newNote}
            isImportant={isImportant}
            handleChange={handleChange}
            addNote={addNote}
          />
        </>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleChange={handleChange}
        />
      )}

      <ShowButton toggleShowAll={toggleShowAll} showAll={showAll} />
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} toggleImportance={toggleImportance} />
        ))}
      </ul>
    </div>
  );
}

export default App;
