import { useState, useEffect, useRef } from "react";

function App() {
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load saved jobs instantly on startup
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });

  // Prevent StrictMode from overwriting saved data on first render
  const isFirstLoad = useRef(true);

  // Save jobs whenever they change (but skip first render)
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "gray";
    case "Interview":
      return "blue";
    case "Offer":
      return "green";
    case "Rejected":
      return "red";
    default:
      return "black";
  }
};

  const addJob = () => {
  if (!jobTitle || !company) return;

  const newJob = {
    title: jobTitle,
    company: company,
    status: status
  };

  if (editingIndex !== null) {
    const updatedJobs = [...jobs];
    updatedJobs[editingIndex] = newJob;
    setJobs(updatedJobs);
    setEditingIndex(null);
  } else {
    setJobs([...jobs, newJob]);
  }

  setJobTitle("");
  setCompany("");
  setStatus("Applied");
};

  const deleteJob = (indexToDelete) => {
    const updatedJobs = jobs.filter((_, index) => index !== indexToDelete);
    setJobs(updatedJobs);
  };

  const startEdit = (index) => {
  const job = jobs[index];

  setJobTitle(job.title);
  setCompany(job.company);
  setStatus(job.status);

  setEditingIndex(index);
};

const appliedCount = jobs.filter(job => job.status === "Applied").length;
const interviewCount = jobs.filter(job => job.status === "Interview").length;
const offerCount = jobs.filter(job => job.status === "Offer").length;
const rejectedCount = jobs.filter(job => job.status === "Rejected").length;


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

      <h3>Search Jobs</h3>

<input
  placeholder="Search by company or title..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

<h3>Application Stats</h3>

<div style={{ marginBottom: "20px" }}>
  <span style={{ marginRight: "15px" }}>Applied: {appliedCount}</span>
  <span style={{ marginRight: "15px" }}>Interview: {interviewCount}</span>
  <span style={{ marginRight: "15px" }}>Offer: {offerCount}</span>
  <span>Rejected: {rejectedCount}</span>
</div>


      <h3>My Applications</h3>

      {jobs.length === 0 && <p>No jobs added yet.</p>}

      {jobs
  .filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map((job, index) => (
        <div key={index}>
          {job.title} - {job.company} 
<span style={{
  color: "white",
  backgroundColor: getStatusColor(job.status),
  padding: "3px 8px",
  borderRadius: "6px",
  marginLeft: "8px"
}}>
  {job.status}
</span>
          <button
  onClick={() => startEdit(index)}
  style={{ marginLeft: "10px" }}
>
  Edit
</button>
          <button
            onClick={() => deleteJob(index)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
