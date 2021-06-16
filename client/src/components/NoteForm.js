import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const handleChange = (e) => {
    const { type, value, checked } = e.target;
    if (type === 'checkbox') {
      setIsImportant(checked);
    } else {
      setNewNote(value);
    }
  };

  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      date: new Date(),
      important: isImportant,
    });
    setNewNote('');
    setIsImportant(false);
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <label>
          New Note:
          <input
            type="text"
            name="newNote"
            value={newNote}
            onChange={handleChange}
          />
        </label>
        <label>
          Important
          <input
            type="checkbox"
            name="important"
            value={isImportant}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NoteForm;
