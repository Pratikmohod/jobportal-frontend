import { useEffect, useState } from "react";
import Form from "./Form";
import Style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../apiCalls/UserApi";
import { useNavigate, Link } from "react-router-dom";
import { fetchProfile } from "../../apiCalls/ProfileAPI";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });

  const { username, password } = loginDetails;
  const loginData = [
    {
      name: "username",
      type: "text",
      state: username,
    },
    {
      name: "password",
      type: "password",
      state: password,
    },
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, loading, error, singleUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setLoginDetails({
      ...loginDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(
      loginUser(loginDetails)
    );

    if (loginUser.fulfilled.match(result)) {
      dispatch(fetchProfile());
    }

  };

  useEffect(() => {
    if (accessToken && singleUser?.id) {
      navigate("/homePage");
    }
  }, [accessToken,singleUser,navigate]);

  if (error) {
    console.log("LOGIN ERROR: ",error);
  }
  
  return (
    <div className={Style.page}>
      <div className={Style.card}>
        <h1 className={Style.title}>Login</h1>
        <p className={Style.subtitle}>
          Welcome back, please enter your details
        </p>
 
        <form onSubmit={handleSubmit} className={Style.form}>
          <Form data={loginData} handleChange={handleChange} />
 
          {error && (
            <div className={Style.errorBox}>
              {typeof error === "string"
                ? error
                : error?.detail || "Something went wrong"}
            </div>
          )}
 
          <button className={Style.submitBtn} disabled={loading}>
            {loading ? "Logging In..." : "Login"}
          </button>
 
          <div className={Style.footerText}>
            Don't have an account?{" "}
            <Link to="/" className={Style.footerLink}>
              SignUp
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
