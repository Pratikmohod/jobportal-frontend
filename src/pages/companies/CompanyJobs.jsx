import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Style from "./CompanyJobs.module.css";
import JobList from "../JobPost/JobList";
import { useEffect, useState } from "react";
import { fetchJobs } from "../../apiCalls/JobPost";
import { useSearchParams } from "react-router-dom";
const CompanyJobs = () => {
  const { companyName } = useParams();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  const companyJobs = jobs.filter(
    (job) =>
      job.company_name?.trim().toLowerCase() ===
      companyName?.trim().toLowerCase(),
  );

  return (
    <section className={Style.container}>
      <h1 className={Style.heading}>{companyName} Jobs</h1>

      <div className={Style.jobGrid}>
        {companyJobs.length > 0 ? (
          companyJobs.map((job) => (
            <article key={job.id} className={Style.jobCard}>
              <div className={Style.cardHeader}>
                <span className={Style.jobId}>#{job.id}</span>

                <span className={Style.badge}>Hiring</span>
              </div>

              <h2>{job.title}</h2>

              <div className={Style.details}>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>

                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>

                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
              </div>
              <button
                className={Style.applyBtn}
                onClick={() => navigate(`/singleJob/${job.id}`)}
              >
                Apply Now
              </button>
            </article>
          ))
        ) : (
          <h2>No Jobs Found</h2>
        )}
      </div>
    </section>
  );
};

export default CompanyJobs;
