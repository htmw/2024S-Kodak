import React, { useState } from 'react';
import '/Users/yashjani/Documents/Code/Shp1/SmartHirePro1/src/pages/Upload/Upload.css'; 
import logo from '../../assets/logo.jpeg'; // Import the logo image

function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchedWords, setMatchedWords] = useState([]);

  const importantWordsArray = [
    "Information Technology", "Computer Science", ".NET", "algorithms", "android", "architecture", "architectures",
    "audio", "AutoCAD", "AWS", "big data", "business analysis", "business continuity", "C (programming language)",
    "C#", "C++", "CAD", "certification", "Cisco", "cloud", "compliance", "computer applications",
    "computer science", "controls", "CSS", "D (programming language)", "data center", "data collection",
    "data entry", "data management", "database", "datasets", "design", "development activities",
    "digital marketing", "digital media", "distribution", "DNS", "ecommerce", "e-commerce", "end user",
    "experimental", "experiments", "frameworks", "front-end", "GIS", "graphic design", "hardware", "HTML5",
    "I-DEAS", "information management", "information security", "information technology", "intranet", "iOS",
    "iPhone", "IT infrastructure", "ITIL", "Java", "Javascript", "JIRA", "LAN", "licensing", "Linux",
    "machine learning", "MATLAB", "matrix", "mechanical engineering", "migration", "mobile", "modeling",
    "networking", "operations management", "oracle", "OS", "process development", "process improvement",
    "process improvements", "product design", "product development", "product knowledge", "program management",
    "programming", "protocols", "prototype", "Python", "quality assurance", "real-time", "research",
    "resource management", "root cause", "routing", "SaaS", "SAS", "SCI", "scripting", "scrum", "SDLC",
    "SEO", "service delivery", "software development", "software development life cycle", "software engineering",
    "SQL", "SQL server", "tablets", "technical", "technical issues", "technical knowledge", "technical skills",
    "technical support", "test cases", "test plans", "testing", "troubleshooting", "UI", "Unix", "usability",
    "user experience", "UX", "variances", "vendor management", "VMware", "web services", "workflows"
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadDocument = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const fileContent = event.target.result;
        const matched = importantWordsArray.filter(word => fileContent.includes(word));
        setMatchedWords(matched);
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="Upload-section">
      <img src={logo} alt="Logo" className="logo" />
      <h2>Upload your Resume!</h2>
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf, .doc, .docx"
      />
      <button onClick={uploadDocument}>Upload</button>
      <div>
        <h3>Matched Important Words:</h3>
        <ul>
          {matchedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UploadPage;
