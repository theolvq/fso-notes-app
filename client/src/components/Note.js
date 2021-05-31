const Note = ({ note }) => {
  return (
    <li style={{ color: note.important ? 'red' : 'grey' }}>
      {note.content} - {note.date}
    </li>
  );
};

export default Note;
