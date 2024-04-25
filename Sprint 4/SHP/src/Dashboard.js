import React, { useState, useEffect } from 'react';
import axios from 'axios';


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
    // Read username from cookie
    const savedUsername = getCookie('username');
    if (savedUsername) {
      setUsername(savedUsername);
      // Call your API with the username and page count
      fetchJobs(savedUsername, pageCount);
    }
  }, [pageCount]); // Trigger useEffect when pageCount changes

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

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <h3>Jobs List:</h3>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default Dashboard;
