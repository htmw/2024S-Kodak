import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Description.css';
import Chart from 'chart.js/auto';

const JobDetail = ({ jobTitle }) => {
  return <div className="job-detail">{jobTitle}</div>;
};

const JobDetailItem = ({ label, value }) => {
  return (
    <div className="job-detail-item">
      <span className="job-detail-label">{label}:</span> {value}
    </div>
  );
};

const JobDetailLink = ({ label, url }) => {
  return (
    <div className="job-detail-link">
      {label}: <a href={url} className="job-detail-link-url" target="_blank" rel="noopener noreferrer">{url}</a>
    </div>
  );
};

const JobDescription = () => {
  const { jobId } = useParams();
  const [jobDetails, setJobDetails] = useState(null);
  const [username, setUsername] = useState('');
  const [scoreData, setScoreData] = useState(null);
  const [chartInstance, setChartInstance] = useState(null);

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

  const handleClick = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/jobs/score', {
        params: {
          username: username,
          job: jobDetails.jobDescription
        }
      });
      setScoreData(response.data);

      renderPieChart(response.data.score);

    } catch (error) {
      console.error('Error fetching Relevance score:', error);
    }
  };

  useEffect(() => {
    const fetchJobDetails = async () => {
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
        console.log("Job Details : ", response.data);
        setJobDetails(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJobDetails();
  }, [jobId]);

  const renderPieChart = (score) => {
    console.log("Score " , score);
    var ctx = document.getElementById('myChart'); // node
    var ctx = document.getElementById('myChart').getContext('2d'); // 2d context
    var ctx = 'myChart'; // element id
    if (chartInstance) {
      chartInstance.destroy();
    }
    setChartInstance(new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Relevance Score',
          data: [100 - score, score],
          backgroundColor: [
            'rgb(21, 19, 19)',
            'rgb(27, 203, 212)',
          ],
        }],
      },
    }));
  };

  return (
    <main className="job-detail-container">
      <JobDetail jobTitle={jobDetails?.jobTitle} />
      <button className="relevance-score-button" onClick={handleClick}>Relevance Score</button>
      <section className="job-detail-section">
        <div className="bordered-field">
          <JobDetailItem label="Job Type" value={jobDetails?.contractType} />
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Location" value={jobDetails?.locationName} />
        </div>
        <div className="bordered-field">
          <div className="job-description">
            <span className="job-description-label">Job Description:<br /></span>
            <span className="job-description-text">{jobDetails?.jobDescription}</span>
          </div>
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Employer Id" value={jobDetails?.employerId} />
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Employer Name" value={jobDetails?.employerName} />
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Salary Type" value={jobDetails?.salaryType} />
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Currency" value={jobDetails?.currency} />
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Maximum Salary" value={jobDetails?.maximumSalary} />
        </div>
        <div className="bordered-field">
          <JobDetailItem label="Expiration Date" value={jobDetails?.expirationDate} />
        </div>
        <div className="bordered-field">
        <JobDetailLink label="External Url" url={jobDetails?.externalUrl} />
        </div>
        {/* <div className="bordered-field">
          <JobDetailItem label="Expiration Date" value={jobDetails?.expirationDate} />
        </div> */}
      </section>
      {/* <JobDetailLink label="Url to job on reed.co.uk" url={jobDetails?.reedUrl} />
      <JobDetailLink label="External Url (for jobs with the application on an external site)" url={jobDetails?.externalUrl} /> */}
      {scoreData && (
        <div className="piechart-container">
          <div className="pie-chart-display">
          <canvas id="myChart" width="400" height="400"></canvas>
            <div className="color-block-black"></div>
            <div className="color-block-blue"></div>
          </div>
          <div className="score-display">{scoreData.score}%</div>
        </div>
      )}
    </main>
  );
};

export default JobDescription;
