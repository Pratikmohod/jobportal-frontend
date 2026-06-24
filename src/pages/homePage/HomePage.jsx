import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../../apiCalls/JobPost";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import JobList from "../JobPost/JobList";

const HomePage = () => {
  const { jobs, count, loading } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  const totalPages = count ? Math.ceil(count / 10) : 1;

  if (loading) {
    return <h2>Loading...</h2>
  }
  return (
    <>
      

      <JobList jobs={jobs} />

      {/* Pagination */}

      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`page-btn ${
              currentPage === index + 1 ? "active-page" : ""
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="page-btn"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;
