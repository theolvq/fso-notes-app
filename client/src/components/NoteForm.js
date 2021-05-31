const NoteForm = ({ addNote, newNote, isImportant, handleChange }) => {
  return (
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
      <button>Add</button>
    </form>
  );
};

export default NoteForm;
