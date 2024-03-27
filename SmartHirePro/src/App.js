import React, { useState } from 'react';
import './App.css';
import logo from '/Users/seungahchoi/Documents/US/Pace /Spring 2024/CS691/2024S-Kodak/SmartHirePro/src/Components/assets/logo.jpeg'; // Adjust the path to your actual logo file
import LoginSignup from '/Users/seungahchoi/Documents/US/Pace /Spring 2024/CS691/2024S-Kodak/SmartHirePro/src/Components/LoginSignup/LoginSignup.jsx'

/* to test the LoginSignup page 
function App() {
  return (
    <div>
      <LoginSignup/>
    </div>
  );
}
export default App;
use this section to test the loginsignup page dont forget to block out the upload page as well */ 

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadDocument = () => {
    if (selectedFile) {
      // You can perform additional checks or validation here

      // Simulate an asynchronous file upload (replace this with actual server-side code)
      setTimeout(() => {
        alert('File uploaded successfully!');
      }, 1000);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="SmartHire Pro Logo" />
        <div className="Upload-section">
          <h2>Upload your Resume!</h2>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf, .doc, .docx"
          />
          <button onClick={uploadDocument}>Upload</button>
         
        </div>
        
      </header>
    </div>
  );
}

export default App;
