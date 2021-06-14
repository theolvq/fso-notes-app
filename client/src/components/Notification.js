const Notification = ({ message }) => {
  const errorStyle = {
    border: '3px solid hsla(9, 87%, 47%, 1)',
    background: 'hsla(9, 87%, 47%, 0.6)',
    color: 'red',
  };
  const confirmStyle = {
    border: '3px solid hsla(110, 66%, 47%, 1)',
    background: 'hsla(100, 66%, 47%, 0.6)',
    color: 'green',
  };
  const style = message.toLowerCase().includes('error')
    ? errorStyle
    : confirmStyle;
  return (
    <div style={style}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
