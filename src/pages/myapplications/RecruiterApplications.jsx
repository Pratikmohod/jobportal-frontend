import React, { useEffect } from "react";
import {
  fetchRecruiterApplications,
  updateApplicationStatus,
} from "../../apiCalls/ApplicationApi";
import { useDispatch, useSelector } from "react-redux";
import Style from "./RecruiterApplications.module.css";

const RecruiterApplications = () => {
  const dispatch = useDispatch();

  const { applications, loading } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchRecruiterApplications());
  }, [dispatch]);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateApplicationStatus({ id, status }));
  };

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>
        Received Applications ({applications?.length || 0})
      </h1>

      {loading && <h3>Loading...</h3>}

      <div className={Style.grid}>
        {applications?.map((app) => (
          <div key={app.id} className={Style.card}>
            <h2>{app.applicant_name}</h2>

            <div className={Style.info}>
              <p>
                <strong>Email:</strong> {app.applicant_email}
              </p>

              <p>
                <strong>Mobile:</strong> {app.applicant_mobile}
              </p>

              <p>
                <strong>Role:</strong> {app.applicant_role}
              </p>

              <p>
                <strong>Job:</strong> {app.job_title}
              </p>

              <p>
                <strong>Status:</strong>
                <span
                  className={`${Style.status} ${
                    app.status === "accepted"
                      ? Style.accepted
                      : app.status === "rejected"
                        ? Style.rejected
                        : Style.pending
                  }`}
                >
                  {app.status}
                </span>
              </p>

              {app.resume_url && (
                <a
                  href={app.resume_url}
                  target="_blank"
                  rel="noreferrer"
                  className={Style.resumeBtn}
                >
                  View Resume
                </a>
              )}
            </div>

            {app.status === "pending" && (
              <div className={Style.buttonGroup}>
                <button
                  disabled={loading}
                  className={Style.acceptBtn}
                  onClick={() => handleStatusUpdate(app.id, "accepted")}
                >
                  Accept
                </button>

                <button
                  disabled={loading}
                  className={Style.rejectBtn}
                  onClick={() => handleStatusUpdate(app.id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterApplications;
