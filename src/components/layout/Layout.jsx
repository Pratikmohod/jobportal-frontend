import { Outlet } from "react-router-dom";
import NavContainer from "../navbar/NavContainer";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfile } from "../../apiCalls/ProfileAPI";

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      dispatch(fetchProfile());
    }
  },[dispatch])

  let sectionCss = {
    height: "90vh",
    display: "flex ",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "column",
  };
  return (
    <main>
      <nav>
        <NavContainer />
      </nav>
      <section className={sectionCss}>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
