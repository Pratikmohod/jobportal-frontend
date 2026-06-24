import { Link, useNavigate } from "react-router-dom";
import "./JobList.css";
const JobList = ({ jobs }) => {
  const navigate = useNavigate();

  return (
    <section className="job-container">
      {jobs?.map((value) => (
        <article key={value.id} className="job-card">
          <div className="job-header">
            <h2>{value.company_name}</h2>
            <span className="job-location">{value.location}</span>
          </div>

          <h3 className="job-title">{value.title}</h3>

          <div className="job-details">
            <p><strong>Experience:</strong> {value.experience}</p>
            <p><strong>Salary:</strong> ₹{value.salary}</p>
          </div>

          <p className="job-description">
            {value.description?.slice(0, 80)}...
            <Link to={`/singleJob/${value.id}`}> View More</Link>
          </p>

          <button
            className="apply-btn"
            onClick={() => navigate(`/singleJob/${value.id}`)}
          >
            Apply Now
          </button>
        </article>
      ))}
    </section>
  );
};

export default JobList;