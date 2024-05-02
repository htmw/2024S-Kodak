import React from "react";
import "./Description.css";

const JobDetail = ({ jobTitle }) => {
  return React.createElement("div", { className: "job-detail" }, jobTitle);
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
  return React.createElement(
    "main",
    { className: "job-detail-container" },
    React.createElement(JobDetail, { jobTitle: jobTitle }),
    React.createElement(
      "section",
      { className: "job-detail-section" },
      React.createElement(JobDetailItem, { label: "Job Type", value: jobType }),
      React.createElement(JobDetailItem, { label: "Location", value: location }),
      React.createElement(
        "div",
        { className: "job-description" },
        React.createElement(
          "span",
          { className: "job-description-label" },
          "Job Description:",
          React.createElement("br", null)
        ),
        React.createElement("span", { className: "job-description-text" }, jobDescription)
      ),
      React.createElement(JobDetailItem, { label: "Employer Id", value: employerId }),
      React.createElement(JobDetailItem, { label: "Employer Name", value: employerName }),
      React.createElement(JobDetailItem, { label: "Salary Type", value: salaryType }),
      React.createElement(JobDetailItem, { label: "Currency", value: currency }),
      React.createElement(JobDetailItem, { label: "Maximum Salary", value: maxSalary }),
      React.createElement(JobDetailItem, { label: "Expiration Date", value: expirationDate })
    ),
    React.createElement(JobDetailLink, { label: "Url to job on reed.co.uk", url: reedUrl }),
    React.createElement(
      JobDetailLink,
      {
        label: "External Url (for jobs with the application on an external site)",
        url: externalUrl,
      }
    )
  );
};

export default MyComponent;
