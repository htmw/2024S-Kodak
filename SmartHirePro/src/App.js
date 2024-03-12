import React, { useState } from 'react';
import './App.css';
import logo from '/Users/yashjani/Documents/Code/smarthirepro/src/assets/6C3DAA43-20EE-4541-B35E-6BD34D0523EB_1_102_o.jpeg'; // Adjust the path to your actual logo file



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
