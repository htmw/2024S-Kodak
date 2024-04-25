import React, { useState } from 'react';
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import axios from 'axios';
import './App.css';
import logo from 'C:/MS Course Work/SEM 4/Project/Git Repo/2024S-Kodak/SmartHirePro/src/assets/logo.jpeg';

function LoginRegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      // Perform login
      console.log('Performing login with username:', username, 'and password:', password);
    } else {
      // Perform registration
      console.log('Performing registration with username:', username, 'and resume:', selectedFile);

      // Read resume file and extract data
      if (selectedFile) {
        const resumeData = await readResume(selectedFile);
        console.log('Extracted resume data:', resumeData);

        // Make API call to register user with resume data
        registerUserWithResume(username, password, resumeData);
      }
    }
    // Reset form fields
    setUsername('');
    setPassword('');
    setSelectedFile(null);
  };

  const readResume = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        const paragraphs = getParagraphs(content);
        resolve(paragraphs);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const getParagraphs = (content) => {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());
    const paragraphsXml = xml.getElementsByTagName("w:p");
    const paragraphs = [];

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = "";
      const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
      for (let j = 0, len2 = textsXml.length; j < len2; j++) {
        const textXml = textsXml[j];
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      if (fullText) {
        paragraphs.push(fullText);
      }
    }
    return paragraphs;
  };

  const str2xml = (str) => {
    if (str.charCodeAt(0) === 65279) {
      // BOM sequence
      str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
  };

  const registerUserWithResume = (username, password, resumeData) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('resumeData', JSON.stringify(resumeData)); // Sending as JSON string for simplicity

    axios.post('http://127.0.0.1:5000/userauth/register', formData)
      .then(response => {
        alert('User registered successfully!');
      })
      .catch(error => {
        alert('Failed to register user. Please try again later.');
      });
  };

  return (
    <div className="login-register-container">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="SmartHire Pro Logo" />
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
      </header>
      <form onSubmit={handleFormSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {!isLogin && (
          <div className="input-group">
            <label htmlFor="resume">Resume:</label>
            <input
              type="file"
              id="resume"
              onChange={handleFileChange}
              accept=".pdf, .doc, .docx"
            />
          </div>
        )}
        <div className="action-buttons">
          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Login instead'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginRegisterPage;
