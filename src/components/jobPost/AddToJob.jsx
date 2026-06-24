import { useEffect, useState } from "react";
import Form from "../auth/Form";
import Style from "../auth/Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addJob } from "../../apiCalls/JobPost";
import { useNavigate } from "react-router-dom";
import { responseCodeChange } from "../../slice/JobPostSlice";

const AddToJob = () => {
  let dispatch = useDispatch();
  let singleUser = useSelector((state) => state?.user?.singleUser);
  let responseCode = useSelector((state) => state?.jobs?.responseCode);
  let navigate = useNavigate();
  useEffect(() => {
    if (responseCode === 201) {
      navigate("/homePage");
      dispatch(responseCodeChange());
    }
  }, [responseCode]);
  let [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    experience: "",
    skills: "",
    company_name: "",
    salary: "",
    location: "",
  });
  let {
    title,
    description,
    experience,
    skills,
    company_name,
    salary,
    location,
  } = jobDetails;
  let jobData = [
    {
      name: "title",
      type: "text",
      state: title,
    },
    {
      name: "experience",
      type: "text",
      state: experience,
    },
    {
      name: "skills",
      type: "text",
      state: skills,
    },
    {
      name: "company_name",
      type: "text",
      state: company_name,
    },
    {
      name: "salary",
      type: "text",
      state: salary,
    },
    {
      name: "location",
      type: "text",
      state: location,
    },
  ];

  let handleChange = (e) => {
    let { value, name } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    if (
      title === "" ||
      description === "" ||
      experience === "" ||
      skills === "" ||
      company_name === "" ||
      salary === "" ||
      location === ""
    ) {
      alert("Fill All The Fields");
    } else {
      if (singleUser !== null) {
        let details = { ...jobDetails, userId: singleUser.id };
        dispatch(addJob(jobDetails));
      }
    }
  };
  let descriptionCss = {
    width: "80%",
    height: "100px",
    padding: "10px",
    borderRadius: "20px",
  };
  return (
    <div className={Style.page}>
      <div className={Style.card}>
        <h1 className={Style.title}>Job Posting Form</h1>
        <p className={Style.subtitle}>
          Create a new job opening and reach qualified candidates.
        </p>

        <form
          onSubmit={handleSubmit}
          className={`${Style.form} ${Style.formRegister}`}
        >
          <Form data={jobData} handleChange={handleChange} />

          <div className={Style.formGroup}>
            <label htmlFor="description">Description</label>

            <textarea
              name="description"
              id="description"
              value={description}
              onChange={handleChange}
              placeholder="Enter the job description"
              className={Style.textarea}
            />
          </div>

          <button type="submit" className={Style.submitBtn}>
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddToJob;
