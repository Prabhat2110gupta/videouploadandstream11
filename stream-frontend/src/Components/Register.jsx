import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    about: '',
  });

  const [message, setMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/v1/users", userData);
      setMessage(`User ${response.data.name} registered successfully!`);
      setUserData({
        name: '',
        email: '',
        password: '',
        about: '',
      });
    } catch (error) {
      console.error('Registration failed:', error);
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '1rem' }}>
      <h2>Register</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>About:</label><br />
          <textarea
            name="about"
            value={userData.about}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: '1rem' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
