import React, { useState } from 'react';
import mammoth from 'mammoth'; 
import './Services.css';




function App() {
  const [extractedWords, setExtractedWords] = useState([]);
  const [jobsRelatedToCommonWords, setJobsRelatedToCommonWords] = useState(new Map());

  const convertDocxToTxt = () => {
    const input = document.getElementById("docx-file");
    const reader = new FileReader();
    reader.onload = function (event) {
      const arrayBuffer = reader.result;
      mammoth.extractRawText({ arrayBuffer: arrayBuffer })
        .then(function (result) {
          const text = result.value;
          const words = extractWords(text);
          setExtractedWords(words);
          fetchJobs(words);
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    reader.readAsArrayBuffer(input.files[0]);
  }

  const extractWords = (text) => {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    return Array.from(new Set(words));
  }

  const fetchJobs = async (words) => {
    const url = "https://www.arbeitnow.com/api/job-board-api";
    try {
      const response = await fetch(url);
      const data = await response.json();
      const jobs = data.data;

      const commonWordsInJobs = new Map();
      jobs.forEach((job) => {
        words.forEach((word) => {
          if (job.description.toLowerCase().includes(word)) {
            if (!commonWordsInJobs.has(word)) {
              commonWordsInJobs.set(word, []);
            }
            commonWordsInJobs.get(word).push(job);
          }
        });
      });

      setJobsRelatedToCommonWords(commonWordsInJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }

  return (
    <div className="App">
      <div id="upload-container">
        <h1>Let's Find Jobs Using AI</h1>
        <input type="file" id="docx-file" accept=".docx" />
        <button className="btn" onClick={convertDocxToTxt}>
          <span className="sparkle">✨</span>
          <span className="text">Upload Your Resume</span>
        </button>
      </div>

      <div id="jobs-related-to-common-words-container">
        {[...jobsRelatedToCommonWords.keys()].map((word) => (
          <section key={word}>
            <h2>Jobs related to: "{word}"</h2>
            <ul>
              {jobsRelatedToCommonWords.get(word).map((job, index) => (
                <li key={index}>{job.title} at {job.company_name}</li>
              ))}
            </ul>
          </section>
        ))}
        {jobsRelatedToCommonWords.size === 0 && (
          <div>No jobs found matching the common words from the uploaded document.</div>
        )}
      </div>
    </div>
  );
}

export default App;
