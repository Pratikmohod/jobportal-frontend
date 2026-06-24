import { NavLink } from "react-router-dom";

const NavProfile = ({ data, closeMenu }) => {
  return (
    <>
      {data.map((value) => {
        return (
          <li key={value.name} onClick={closeMenu}>
            <NavLink to={value.path}  onClick={() => closeMenu?.()}>{value.name}</NavLink>
          </li>
        );
      })}
    </>
  );
};

export default NavProfile;
