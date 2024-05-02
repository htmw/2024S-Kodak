import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Description.css';

const Description = ({ params }) => {
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const { jobid } = params;
    if (jobid) {
      fetchJobDetails(jobid);
    }
  }, [params]);

  const fetchJobDetails = async (jobid) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/jobs/${jobid}`);
      setJobDetails(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  if (!jobDetails) {
    return <div>Loading...</div>;
  }

  const {
    jobTitle,
    jobType,
    location,
    jobDescription,
    employerId,
    employerName,
    salaryType,
    currency,
    maxSalary,
    expirationDate,
    reedUrl,
    externalUrl,
  } = jobDetails;

  return (
    <main className="job-detail-container">
      <div className="job-detail">{jobTitle}</div>
      <section className="job-detail-section">
        <div className="job-detail-item">
          <span className="job-detail-label">Job Type:</span> {jobType}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Location:</span> {location}
        </div>
        <div className="job-description">
          <span className="job-description-label">Job Description:</span> <br />
          <span className="job-description-text">{jobDescription}</span>
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Employer Id:</span> {employerId}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Employer Name:</span> {employerName}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Salary Type:</span> {salaryType}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Currency:</span> {currency}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Maximum Salary:</span> {maxSalary}
        </div>
        <div className="job-detail-item">
          <span className="job-detail-label">Expiration Date:</span> {expirationDate}
        </div>
      </section>
      <div className="job-detail-link">
        Url to job on reed.co.uk: <a href={reedUrl} className="job-detail-link-url" target="_blank" rel="noopener noreferrer">{reedUrl}</a>
      </div>
      <div className="job-detail-link">
        External Url: <a href={externalUrl} className="job-detail-link-url" target="_blank" rel="noopener noreferrer">{externalUrl}</a>
      </div>
    </main>
  );
};

export default Description;
