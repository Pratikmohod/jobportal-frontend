import { useEffect, useState } from "react";
import Form from "./Form";
import Style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./../../apiCalls/UserApi";
import { useNavigate } from "react-router-dom";
import { clearAddResponse } from "../../slice/UserSlice";

const Register = () => {
  const { loading, validationError } = useSelector((state) => state.user);

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  let [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile_no: "",
    gender: "",
    role: "",
    dob: "",
    skills: "",
    resume: null,
  });
  let {
    username,
    email,
    password,
    confirmPassword,
    mobile_no,
    gender,
    role,
    dob,
    skills,
    resume,
  } = userDetails;

  let mergerColumn = {
    gridColumn: "1/3",
    textAlign: "center",
  };
  let registerData = [
    {
      name: "username",
      type: "text",
      state: username,
    },
    {
      name: "email",
      type: "email",
      state: email,
    },
    {
      name: "password",
      type: "password",
      state: password,
    },
    {
      name: "confirmPassword",
      type: "password",
      state: confirmPassword,
    },
    {
      name: "mobile_no",
      type: "tel",
      state: mobile_no,
    },
    {
      name: "skills",
      type: "text",
      state: skills,
    },
    {
      name: "dob",
      type: "date",
      state: dob,
    },
  ];

  let dispatch = useDispatch();
  let handleChange = (e) => {
    let { value, name } = e.target;
    setFormError("");
    setUserDetails({ ...userDetails, [name]: value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      mobile_no === "" ||
      gender === "" ||
      role === "" ||
      dob === "" ||
      skills === "" ||
      !resume
    ) {
      setFormError("Please fill all required fields and upload your resume.");
      return;
    }
    setFormError("");

    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("mobile_no", mobile_no);
    formData.append("gender", gender);
    formData.append("role", role);
    formData.append("dob", dob);
    formData.append("skills", skills);
    formData.append("resume", resume);

    dispatch(addUser(formData));
  };

  let response = useSelector((state) => state.user.addResponse);
  let navigate = useNavigate();
  useEffect(() => {
    if (response?.status === 201) {
      setSuccessMessage("Registration successful!");
      dispatch(clearAddResponse());
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  }, [response, dispatch, navigate]);
  return (
    <div className={Style.page}>
      <div className={`${Style.card} ${Style.cardWide}`}>
        <h1 className={Style.title}>Registration Form</h1>
        <p className={Style.subtitle}>Create an account to get started</p>

        <form
          onSubmit={handleSubmit}
          className={`${Style.form} ${Style.formRegister}`}
        >
          <Form data={registerData} handleChange={handleChange} />

          {/* RESUME SECTION */}

          <div className={Style.formGroup}>
            <label className={Style.label}>Resume (PDF, DOC, DOCX)</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setUserDetails({
                  ...userDetails,
                  resume: e.target.files[0],
                })
              }
              className={Style.input}
            />

            {resume && (
              <p className={Style.fileName}>Selected File: {resume.name}</p>
            )}
          </div>

          {/* Gender SECTION */}

          <div className={Style.radioGroup}>
            <span className={Style.radioGroupLabel}>Gender</span>
            <div className={Style.radioOptions}>
              <label className={Style.radioOption}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>
              <label className={Style.radioOption}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
              <label className={Style.radioOption}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          <div className={Style.radioGroup}>
            <span className={Style.radioGroupLabel}>Role</span>
            <div className={Style.radioOptions}>
              <label className={Style.radioOption}>
                <input
                  type="radio"
                  name="role"
                  value="jobseeker"
                  checked={role === "jobseeker"}
                  onChange={handleChange}
                />
                Job Seeker
              </label>
              <label className={Style.radioOption}>
                <input
                  type="radio"
                  name="role"
                  value="hiring"
                  checked={role === "hiring"}
                  onChange={handleChange}
                />
                Hiring
              </label>
            </div>
          </div>

          {validationError && (
            <div className={Style.fieldErrors}>
              {Object.entries(validationError).map(([field, messages]) => (
                <div key={field} className={Style.fieldErrorGroup}>
                  <div className={Style.fieldErrorTitle}>{field}</div>

                  <ul className={Style.fieldErrorList}>
                    {(Array.isArray(messages) ? messages : [messages]).map(
                      (msg, i) => (
                        <li key={i}>{msg}</li>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {formError && <div className={Style.formError}>{formError}</div>}

          <button className={Style.submitBtn} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>

          {successMessage && (
            <div className={Style.success}>{successMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
