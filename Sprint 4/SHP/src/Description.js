import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Description.css'

const JobDescription = () => {
  const { jobId } = useParams(); // Get the jobId from the URL parameters
  const [jobDetails, setJobDetails] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      // console.log('jobId is : ',jobId)
      try {
        const response = await axios.get('http://127.0.0.1:5000/jobs/detail', {
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


  return React.createElement(
    "main",
    { className: "job-detail-container" },
    React.createElement(JobDetail, { jobTitle: jobDetails.jobTitle }),
    React.createElement(
      "section",
      { className: "job-detail-section" },
      React.createElement(JobDetailItem, { label: "Job Type", value: jobDetails.jobType }),
      React.createElement(JobDetailItem, { label: "Location", value: jobDetails.locationName }),
      React.createElement(
        "div",
        { className: "job-description" },
        React.createElement(
          "span",
          { className: "job-description-label" },
          "Job Description:",
          React.createElement("br", null)
        ),
        React.createElement("span", { className: "job-description-text" }, jobDetails.jobDescription)
      ),
      React.createElement(JobDetailItem, { label: "Employer Id", value: jobDetails.employerId }),
      React.createElement(JobDetailItem, { label: "Employer Name", value: jobDetails.employerName }),
      React.createElement(JobDetailItem, { label: "Salary Type", value: jobDetails.salaryType }),
      React.createElement(JobDetailItem, { label: "Currency", value: jobDetails.currency }),
      React.createElement(JobDetailItem, { label: "Maximum Salary", value: jobDetails.maximumSalary }),
      React.createElement(JobDetailItem, { label: "Expiration Date", value: jobDetails.expirationDate })
    ),
    React.createElement(JobDetailLink, { label: "Url to job on reed.co.uk", url: jobDetails.reedUrl }),
    React.createElement(
      JobDetailLink,
      {
        label: "External Url (for jobs with the application on an external site)",
        url: jobDetails.externalUrl,
      }
    )
  );
};

export default JobDescription;