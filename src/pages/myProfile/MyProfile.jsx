import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, fetchProfile } from "../../apiCalls/ProfileAPI";
import { useEffect } from "react";
import Style from "./MyProfile.module.css";
import { useNavigate } from "react-router-dom";
import { clearMessages } from "../../slice/UserSlice";

const MyProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleUser, loading, success } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token && !singleUser) {
      dispatch(fetchProfile());
    }
  }, [dispatch, singleUser]);

  useEffect(() => {
    if (success === "Account Deleted Successfully") {
      dispatch(clearMessages());
      navigate("/login");
    }
  }, [success, navigate, dispatch]);

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?",
    );
    if (confirmDelete) {
      dispatch(deleteProfile());
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={Style.container}>
      <div className={Style.profileCard}>
        <div className={Style.header}>
          <div className={Style.avatar}>
            {singleUser?.username?.charAt(0).toUpperCase()}
          </div>
          <h1>{singleUser?.username}</h1>
          <p>{singleUser?.role}</p>
        </div>

        <div className={Style.infoContainer}>
          <div className={Style.infoItem}>
            <span>Email</span>
            <p>{singleUser?.email}</p>
          </div>

          <div className={Style.infoItem}>
            <span>Mobile No</span>
            <p>{singleUser?.mobile_no}</p>
          </div>

          <div className={Style.infoItem}>
            <span>Gender</span>
            <p>{singleUser?.gender}</p>
          </div>

          <div className={Style.infoItem}>
            <span>DOB</span>
            <p>{singleUser?.dob}</p>
          </div>

          <div className={Style.infoItem}>
            <span>Role</span>
            <p>{singleUser?.role}</p>
          </div>

          {/* SHOW RESUME AND SKILLS */}

          <div className={Style.infoItem}>
            <span>Skills</span>
            <p>{singleUser?.skills || "Not Added"}</p>
          </div>

          <div className={Style.infoItem}>
            <span>Resume</span>

            {singleUser?.resume_url ? (
              <a
                href={singleUser.resume_url}
                target="_blank"
                rel="noreferrer"
                className={Style.resumeBtn}
              >
                View Resume
              </a>
            ) : (
              <p>No Resume Uploaded</p>
            )}
          </div>

          <div className={Style.BtnContainer}>
            <button onClick={() => navigate("/edit-profile")}>Update</button>

            <button style={{ backgroundColor: "red" }} onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
