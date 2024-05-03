import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './Dashboard.css'; // Import the CSS file
import logo from './assets/Finallogo.png'; // Import the app logo

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const savedUsername = getCookie('username');
    if (savedUsername) {
      setUsername(savedUsername);
      fetchJobs(savedUsername, page);
    }
  }, [page]);

  const fetchJobs = async (username, page) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/jobs/list', {
        params: {
          username: username,
          page: page
        }  
      });
      setJobs(prevJobs => [...prevJobs, ...response.data.joblist]);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/userauth/logout', { username: username });
      // Redirect to login page after successful logout
      navigate('/LoginRegister'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
    <div className="dashboard-container">
      <nav className="navigation-panel">
        <div className="logo-container">
          <img src={logo} alt="App Logo" className="app-logo" />
        </div>
        <ul className="nav-links">
          <li className="nav-link" onClick={() => navigate('/ResumeUpload')}>Upload</li>
          <a  className="logout-link" onClick={handleLogout}>Logout</a>
        </ul>
      </nav>
      <div className="job-content">
        <div className="underline"></div>
        <div className="job-cards-container">
          {jobs.map(job => (
            <div className="job-card" key={job.jobId} onClick={() => navigate(`/JobDescription/${job.jobId}`)}>
              <div className="job-card-content">
                <h4 className="job-title">{job.jobTitle}</h4>
                <p className="employer-name">{job.employerName}</p>
                <p className="date">Date: {job.date}</p>
                <p className="applications">Applications: {job.applications}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="load-more-btn" onClick={handleLoadMore}>Load More</button>
      </div>
    </div>
  );
}

export default Dashboard;
