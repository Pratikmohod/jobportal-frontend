import React, { useEffect } from "react";
import { fetchMyApplications } from "../../apiCalls/ApplicationApi";
import { useDispatch, useSelector } from "react-redux";
import Style from "./MyApplications.module.css";

const MyApplications = () => {
  const dispatch = useDispatch();

  const { applications, loading } = useSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchMyApplications());
  }, [dispatch]);
  

  return (
    <div className={Style.container}>
      <h1 className={Style.title}>My Applications</h1>

      {loading && <h3 className={Style.loading}>Loading Applications...</h3>}

      {!loading && applications?.length === 0 && (
        <h3 className={Style.empty}>No Applications Found</h3>
      )}

      <div className={Style.grid}>
        {applications?.map((app) => (
          <div key={app.id} className={Style.card}>
            <h2>{app.job_title}</h2>

            <p>
              <strong>Company:</strong> {app.company_name}
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

            <p>
              <strong>Applied:</strong>{" "}
              {new Date(app.applied_at).toLocaleDateString("en-GB")}
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
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
