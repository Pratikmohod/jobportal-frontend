import { useSelector } from "react-redux";
import NavProfile from "../navbar/NavProfile";
import { NavLink } from "react-router-dom";
import Style from "./Navbar.module.css";
const Navigation = ({ closeMenu }) => {
  let navData = [
    {
      name: "Home",
      path: "/homePage",
    },
    {
      name: "Companies",
      path: "/companies",
    },
    {
      name: "Job Posts",
      path: "/jobPost",
    },
    {
      name: "My Network",
      path: "/mynetwork",
    },
  ];
  let singleUser = useSelector((state) => state.user.singleUser);
  

  return (
    <div className={Style.navWrapper}>
      <ul>
        <NavProfile data={navData} closeMenu={closeMenu}/>

        {singleUser?.role?.toLowerCase() === "hiring" && (
          <>
            <li>
              <NavLink to="/addToJob" onClick={closeMenu}>Add Job</NavLink>
            </li>

            <li>
              <NavLink to="/received-applications" onClick={closeMenu}>Applications</NavLink>
            </li>
          </>
        )}

        {singleUser?.role?.toLowerCase() === "jobseeker" && (
          <li>
            <NavLink to="/my-applications" onClick={closeMenu}>My Applications</NavLink>
          </li>
        )}
      </ul>
      
    </div>
  );
};

export default Navigation;
