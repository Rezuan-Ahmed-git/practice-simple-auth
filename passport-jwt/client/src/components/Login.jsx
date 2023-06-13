import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post('http://localhost:4000/login', { username, password })
      .then((user) => {
        localStorage.setItem('token', user?.data?.token);
        console.log('user is logged in');
        navigate('/profile');
      })
      .catch((error) => {
        console.log(error);
        navigate('/login');
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        required
      />
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
