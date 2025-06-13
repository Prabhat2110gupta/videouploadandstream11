import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.get(`http://localhost:8080/api/v1/users/email/${loginData.email}`);
      const fetchedUser = response.data;

      if (fetchedUser.password === loginData.password) {
        setMessage(`Welcome, ${fetchedUser.name}!`);
        setIsLoggedIn(true);          // ✅ Mark user as logged in
        navigate('/home');            // ✅ Redirect to home
      } else {
        setMessage("Incorrect password.");
      }

    } catch (error) {
      console.error('Login failed:', error);
      setMessage("User not found or server error.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input type="email" name="email" value={loginData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label><br />
          <input type="password" name="password" value={loginData.password} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
