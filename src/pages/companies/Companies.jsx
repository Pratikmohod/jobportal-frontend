import { useDispatch, useSelector } from "react-redux";
import Style from "./Companies.module.css";
import { useEffect, useState } from "react";
import { fetchJobs } from "../../apiCalls/JobPost";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const { jobs, count } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  let uniqueData = [...new Set(jobs?.map((value) => value.company_name))]
    .map((value) => value.toUpperCase())
    .sort();

  const totalPages = count ? Math.ceil(count / 10) : 1;
  console.log("Jobs:", jobs);
  if (!uniqueData.length) {
    return <h2>No Companies Found</h2>;
  }

  return (
    <>
      {/* HEADING  */}
      <div className={Style.pageHeader}>
        <h2>Top Hiring Companies</h2>
        <p>Explore companies currently hiring talent</p>
      </div>

      {/* COMPANY CARD */}
      <section className={Style.companies}>
        {uniqueData?.map((company, index) => (
          <article key={index} className={Style.companyCard}>
            <div className={Style.logo}>{company.charAt(0)}</div>

            <h3>{company}</h3>

            <button
              onClick={() =>
                navigate(`/company/${company}?page=${currentPage}`)
              }
            >
              View Jobs
            </button>
          </article>
        ))}
      </section>

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

export default Companies;
