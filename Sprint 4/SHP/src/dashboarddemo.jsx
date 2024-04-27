import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Dashboard.css'; 

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

function Dashboard() {
  const [username, setUsername] = useState('');
  const [jobs, setJobs] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    
    const savedUsername = getCookie('username');
    if (savedUsername) {
      setUsername(savedUsername);
     
      fetchJobs(savedUsername, pageCount);
    }
  }, [pageCount]); 

  useEffect(() => {
    
    renderComparisonGraph();
  }, [jobs]); 
  const fetchJobs = async (username, page) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/jobs/list', {
        params: {
          'username': username,
          'page': page
        }
      });
      setJobs(prevJobs => [...prevJobs, ...response.data]); // Append new jobs to the existing list
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleLoadMore = () => {
    setPageCount(prevPageCount => prevPageCount + 1); // Increment page count
  };

  const renderComparisonGraph = () => {
    const salaries = jobs.map(job => job.salary);
    const labels = jobs.map((_, index) => `Job ${index + 1}`);

    const ctx = document.getElementById('comparisonChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Salaries',
          data: salaries,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {username}!</h2>
      <h3>Jobs List:</h3>
      <ul className="job-list">
        {jobs.map(job => (
          <li key={job.id} className="job-item">
            <h4>{job.title}</h4>
            <p><strong>Description:</strong> {job.description}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <p><strong>Job Type:</strong> {job.jobType}</p>
            <p><strong>Requirements:</strong> {job.requirements}</p>
            <p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
            <p><strong>Post Date:</strong> {job.postDate}</p>
          
            {job.id === jobs[jobs.length - 1].id && (
              <div className="comparison-graph-container">
                <h3>Comparison Graph</h3>
                <canvas id="comparisonChart" width="400" height="200"></canvas>
              </div>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
    </div>
  );
}



export default Dashboard;
