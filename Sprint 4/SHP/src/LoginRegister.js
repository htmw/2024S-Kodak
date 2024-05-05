import React, { useState } from 'react';
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import axios from 'axios';
import logo from './assets/logo.jpeg';
import { useNavigate } from "react-router-dom";
import user_icon from './assets/person.png';
import password_icon from './assets/password.png';



const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

function LoginRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

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
      
      // Make API call to perform login
      loginUser(username, password);
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

  const registerUserWithResume = (username, password, resume) => {
    
    const response = axios.post('http://ec2-54-224-174-201.compute-1.amazonaws.com/userauth/register', {
      'username' : username,
      'password' : password,
      'resume' : resume
    })
      .then(response => {
        if (response.status === 200) {
          console.log('User registered successfully!');
        navigate("/Dashboard");
        }
      })
      .catch(error => {
        if (error.response.status === 100){
          console.log('Failed to register user. User already exist.');
        }  else{
          console.log('Failed to register user. Please try again later');
        }
      });
  };

  const loginUser = (username, password) => {
  
    axios.post('http://ec2-54-224-174-201.compute-1.amazonaws.com/userauth/login', {
    'username' : username,
    'password' : password
    })
      .then(response => {
        console.log('User logged in successfully!');
        setCookie('username', username, 30); // Set username in cookie for 30 days
        // Handle successful login, such as redirecting to another page
        navigate("/Dashboard");
      })
      .catch(error => {
        console.log('Failed to log in. Please check your username and password.');
      });
  };

  return (
    <div className='container'>
      <header className="header">
        <img src={logo} className="App-logo" alt="SmartHire Pro Logo" />
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
      </header>
      <form onSubmit={handleFormSubmit}>
        <div className="input">
          <label htmlFor="username">Username: </label>
          <img src={user_icon} alt=""/>
          <div className="inputBox">
            <input placeholder =" User Name " type="text" id="username" value={username} onChange={handleUsernameChange} />
          </div>
        </div>
        <div className="input">
          <label htmlFor="password">Password: </label>
          <img src={password_icon} alt=""/>
          <div className="inputBox">
            <input placeholder =" Password " type="password" id="password" value={password} onChange={handlePasswordChange} />
          </div>
        </div>
        {!isLogin && (
          <div className="input">
            <label htmlFor="resume">Resume:</label>
            <div className="inputBox">
              <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
            </div>
          </div>
        )}
        <div className="submit-container">
          <button type="submit" className="submit">{isLogin ? 'Login' : 'Register'}</button>
          <div className="submit" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create an account' : 'Login instead'}
          </div>
        </div>
      </form>
      </div>
  );
}

export default LoginRegister;