import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Description.css'

const JobDescription = () => {
  const { jobId } = useParams(); // Get the jobId from the URL parameters
  const [jobDetails, setJobDetails] = useState(null);
  const [username, setUsername] = useState('');
  const [scoreData, setScoreData] = useState(null);

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
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      // console.log('jobId is : ',jobId)
      const savedUsername = getCookie('username');
        if (savedUsername) {
          setUsername(savedUsername);
        }
      try {
        const response = await axios.get('http://ec2-54-224-174-201.compute-1.amazonaws.com/jobs/detail', {
          params: {
            jobid: jobId
          }  
        });
        console.log("Job Details Response", response)
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
    
  }, [jobId]);

  if (!jobDetails) {
    return <div>Loading...</div>;
  }
const JobDetail = ({ jobTitle }) => {
  return React.createElement("div", { className: "job-detail" }, jobDetails.jobTitle);
};

const JobDetailItem = ({ label, value }) => {
  return React.createElement(
    "div",
    { className: "job-detail-item" },
    React.createElement("span", { className: "job-detail-label" }, label + ":"),
    " ",
    value
  );
};

const handleClick = async () => {
  try {
    const response = await axios.get('http://ec2-54-224-174-201.compute-1.amazonaws.com/jobs/score', {
      params: {
        username: username,
        job : jobDetails.jobDescription
      }  
    });
    console.log("Relevance Score Response", response);
    setScoreData(response.data);
  } catch (error) {
    console.error('Error fetching Relevance score:', error);
  }
};


const JobDetailLink = ({ label, url }) => {
  return React.createElement(
    "div",
    { className: "job-detail-link" },
    label + ": ",
    React.createElement(
      "a",
      { href: url, className: "job-detail-link-url", target: "_blank", rel: "noopener noref errer" },
      url
    )
  );
};



return (
  <main className="job-detail-container">
    <JobDetail jobTitle={jobDetails.jobTitle} />
    <button className="relevance-score-button" onClick={handleClick}>Relevance Score</button>
    <section className="job-detail-section">
      <div className="bordered-field">
        <JobDetailItem label="Job Type" value={jobDetails.contractType} />
      </div>
      <div className="location">
        <JobDetailItem label="Location" value={jobDetails.locationName} />
      </div>
      <div className="bordered-field">
        <div className="job-description">
          <span className="job-description-label">Job Description:<br /></span>
          <span className="job-description-text">{jobDetails.jobDescription}</span>
        </div>
      </div>
      <div className="bordered-field">
        <JobDetailItem label="Employer Id" value={jobDetails.employerId} />
      </div>
      <div className="bordered-field">
        <JobDetailItem label="Employer Name" value={jobDetails.employerName} />
      </div>
      <div className="bordered-field">
        <JobDetailItem label="Salary Type" value={jobDetails.salaryType} />
      </div>
      <div className="bordered-field">
        <JobDetailItem label="Currency" value={jobDetails.currency} />
      </div>
      <div className="bordered-field">
        <JobDetailItem label="Maximum Salary" value={jobDetails.maximumSalary} />
      </div>
      <div className="bordered-field">
        <JobDetailItem label="Expiration Date" value={jobDetails.expirationDate} />
      </div>
      </section>
      <div className='job-links-container'>
      {/* <JobDetailLink 
    label="Url to job on reed.co.uk" 
    url={jobDetails.reedUrl} 
    className="job-link-reed" />
    <JobDetailLink 
    label="External Url (for jobs with the application on an external site)" 
    url={jobDetails.externalUrl} 
    className="job-link-external"  */}
     <h1>Url to job on reed.co.uk</h1>
     <h1>for jobs with the application on an external site</h1>
     </div>
  

   

    {scoreData && (
        <div className="bordered-field">
          <span className="job-detail-label">Relevance Score:</span>
          <span className="job-detail-value white">{scoreData.score}%</span>
        </div>
      )}
  </main>
);
}

export default JobDescription;
