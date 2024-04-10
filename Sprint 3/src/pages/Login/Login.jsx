import React, { useState } from 'react';
import axios from 'axios';
import "/Users/yashjani/Documents/Code/Shp1/SmartHirePro1/src/pages/Login/Login.css"

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [resume, setResume] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/userauth/register', {
        username: username,
        password: password,
        resume: resume
      });
      if (response.data.status === 1100) {
        setMessage('User registered successfully');
      } else {
        setMessage('User already exists');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'left' , }}>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Resume:</label>
          <textarea rows="6" value={resume} onChange={(e) => setResume(e.target.value)}></textarea>
        </div>
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default SignupForm;
