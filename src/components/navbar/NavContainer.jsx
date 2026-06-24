import { useState } from "react";
import Logo from "./Logo";
import Profile from "./Profile";
import Navigation from "./Navigation";
import Style from "./Navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const NavContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={Style.navbar}>
      <div className={Style.leftSection}>
        <Logo />
      </div>

      <div
        className={Style.menuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div
        className={`${Style.mobileMenu} ${
          menuOpen ? Style.activeMenu : ""
        }`}
      >
        <div className={Style.centerSection}>
          <Navigation closeMenu={closeMenu} />
        </div>

        <div className={Style.rightSection}>
          <Profile closeMenu={closeMenu} />
        </div>
      </div>
    </nav>
  );
};

export default NavContainer;