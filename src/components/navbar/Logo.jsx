import { Link } from "react-router-dom";
import Style from "./Navbar.module.css";

const Logo = () => {
  return (
    <Link to="/homePage" className={Style.logoLink}>
      <div className={Style.logo}>
        <div className={Style.logoBox}>JP</div>
        <h2>JobPortal</h2>
      </div>
    </Link>
  );
};

export default Logo;
