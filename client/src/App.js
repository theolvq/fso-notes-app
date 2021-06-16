import noteService from './services/notes';
import React, { useEffect, useState, useRef } from 'react';
import Note from './components/Note';
import NoteForm from './components/NoteForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ShowButton from './components/ShowButton';
import Togglable from './components/Togglable';
import loginService from './services/login';

function App() {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then(initialNotes => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInNoteAppUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = noteObject => {
    noteFormRef.current.toggleVisibility();
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setMessage('Note added');
        setTimeout(() => setMessage(null), 5000);
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
        setMessage('Note Updated');
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

  const login = async userObject => {
    try {
      const user = await loginService.login(userObject);
      window.localStorage.setItem('loggedInNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
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
          <p>Welcome {user.name}</p>
          <Togglable buttonLabel="new note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
          </Togglable>
        </>
      ) : (
        <Togglable buttonLabel="Login">
          <LoginForm login={login} />
        </Togglable>
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
