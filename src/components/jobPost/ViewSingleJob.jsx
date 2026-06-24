import Style from "./SingleJob.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { applyJob } from "../../apiCalls/ApplicationApi";
import { clearMessage } from "../../slice/ApplicationSlice";
import { useEffect } from "react";

const ViewSingleJob = () => {
  let { id } = useParams();

  let jobs = useSelector((state) => state.jobs.jobs);

  let findJob = jobs?.find((value) => value.id === Number(id));

  let dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.applications,
  );

  useEffect(() => {
    dispatch(clearMessage());
  }, [id, dispatch]);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  return (
    <section className={Style.job}>
      <h1 className={Style.title}>{findJob?.title}</h1>

      <h2 className={Style.company}>{findJob?.company_name}</h2>

      <p>
        <strong>Location:</strong> {findJob?.location}
      </p>

      <p>
        <strong>Salary:</strong> ₹{findJob?.salary}
      </p>

      <p>
        <strong>Experience:</strong> {findJob?.experience}
      </p>

      <p>
        <strong>Skills:</strong> {findJob?.skills}
      </p>

      <div className={Style.description}>
        <strong>Description</strong>
        <p>{findJob?.description}</p>
      </div>

      <button
        disabled={!findJob || loading}
        onClick={() => dispatch(applyJob({ job: findJob.id }))}
      >
        {loading ? "Applying..." : "Apply Now"}
      </button>

      {success && <p style={{ color: "green" }}>{success}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
};

export default ViewSingleJob;
