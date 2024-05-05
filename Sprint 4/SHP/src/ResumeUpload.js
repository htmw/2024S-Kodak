import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import "./ResumeUpload.css"

const UploadResume = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUsername = getCookie('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    
    try {
        const resumeData = await readResume(selectedFile);
        await axios.post('http://ec2-54-224-174-201.compute-1.amazonaws.com/resume/upload', {
            'username' : username,
            'resume' : resumeData
        }
      );

      // Redirect to dashboard page after successful upload
      navigate('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
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

  const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  };

  return (
    <div className='Background-image'>
    <div className="upload-resume-container">
      <h2>Upload New Resume</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".docx"
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
    </div>
  );
}

export default UploadResume;
