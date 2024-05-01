import React from "react";
import "./Description.css";

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
      {label}:{" "}
      <a href={url} className="job-detail-link-url" target="_blank" rel="noopener noreferrer">
        {url}
      </a>
    </div>
  );
};

const MyComponent = ({
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
}) => {
  return (
    <main className="job-detail-container">
      <JobDetail jobTitle={jobTitle} />
      <section className="job-detail-section">
        <JobDetailItem label="Job Type" value={jobType} />
        <JobDetailItem label="Location" value={location} />
        <div className="job-description">
          <span className="job-description-label">
            Job Description:
            <br />
          </span>
          <span className="job-description-text">{jobDescription}</span>
        </div>
        <JobDetailItem label="Employer Id" value={employerId} />
        <JobDetailItem label="Employer Name" value={employerName} />
        <JobDetailItem label="Salary Type" value={salaryType} />
        <JobDetailItem label="Currency" value={currency} />
        <JobDetailItem label="Maximum Salary" value={maxSalary} />
        <JobDetailItem label="Expiration Date" value={expirationDate} />
      </section>
      <JobDetailLink label="Url to job on reed.co.uk" url={reedUrl} />
      <JobDetailLink
        label="External Url (for jobs with the application on an external site)"
        url={externalUrl}
      />
    </main>
  );
};

export default MyComponent;
