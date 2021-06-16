import PropTypes from 'prop-types';
import React, { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        return;
    }
  };
  const handleLogin = e => {
    e.preventDefault();
    login({
      username,
      password,
    });
    setUsername('');
    setPassword('');
  };
  return (
    <form onSubmit={handleLogin}>
      <label>
        username:
        <input
          type="text"
          value={username}
          name="username"
          onChange={handleChange}
        />{' '}
      </label>
      <label>
        password:
        <input
          type="password"
          value={password}
          name="password"
          onChange={handleChange}
        />{' '}
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
