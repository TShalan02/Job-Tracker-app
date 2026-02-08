import { useState } from "react";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [jobs, setJobs] = useState([]);

  const addJob = () => {
    const newJob = {
      title: jobTitle,
      company: company,
      status: status
    };

    setJobs([...jobs, newJob]);

    setJobTitle("");
    setCompany("");
    setStatus("Applied");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Job Application Tracker</h1>

      <h3>Add a Job</h3>

      <input
        placeholder="Job Title"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <br /><br />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>

      <br /><br />

      <button onClick={addJob}>Add Job</button>

      <h3>My Applications</h3>

      {jobs.map((job, index) => (
        <div key={index}>
          {job.title} - {job.company} ({job.status})
        </div>
      ))}
    </div>
  );
}

export default App;
