import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editProfile, fetchProfile } from "../../apiCalls/ProfileAPI";
import Form from "../../components/auth/Form";
import Style from "./EditProfile.module.css";
import { clearMessages } from "../../slice/UserSlice";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser, loading, success } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile_no: "",
    skills: "",
    resume: null,
  });
  //fetch profile if user refresh page
  useEffect(() => {
    if (!singleUser) {
      dispatch(fetchProfile());
    }
  }, [dispatch, singleUser]);

  // Fill form when you get profile data
  useEffect(() => {
    if (singleUser) {
      setFormData({
        username: singleUser?.username || "",
        email: singleUser?.email || "",
        mobile_no: singleUser?.mobile_no || "",
        skills: singleUser?.skills || "",
        resume: null,
      });
    }
  }, [singleUser]);

  if (!singleUser) {
    return <h2>No Profile Found</h2>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = new FormData();

    updatedData.append("username", formData.username);
    updatedData.append("email", formData.email);
    updatedData.append("mobile_no", formData.mobile_no);
    updatedData.append("skills", formData.skills);

    if (formData.resume) {
      updatedData.append("resume", formData.resume);
    }

    dispatch(editProfile(updatedData));
  };

  useEffect(() => {
    if (success === "Profile Updated Successfully") {
      dispatch(fetchProfile());
      dispatch(clearMessages());
      navigate("/myProfile");
      console.log(success);
    }
  }, [success, navigate, dispatch]);

  const editFormData = [
    {
      name: "username",
      type: "text",
      state: formData.username,
    },
    {
      name: "email",
      type: "email",
      state: formData.email,
    },
    {
      name: "mobile_no",
      type: "tel",
      state: formData.mobile_no,
    },
  ];
  return (
    <section className={Style.container}>
      <div className={Style.card}>
        <h1 className={Style.heading}>Edit Profile</h1>

        <form onSubmit={handleSubmit} className={Style.form}>
          <Form data={editFormData} handleChange={handleChange} />

          {/* SKILLS AND RESUME UPLOAD FIELDS */}

          <div className={Style.formGroup}>
            <label>Skills</label>

            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className={Style.input}
              placeholder="Enter your skills"
            />
          </div>

          <div className={Style.formGroup}>
            <label>Replace Resume</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  resume: e.target.files[0],
                })
              }
              className={Style.input}
            />

            {formData.resume && (
              <p className={Style.fileName}>Selected: {formData.resume.name}</p>
            )}
          </div>

          <div className={Style.buttonContainer}>
            <button type="submit" disabled={loading} className={Style.button}>
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
