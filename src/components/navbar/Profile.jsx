import { useEffect } from "react";
import NavProfile from "./NavProfile";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slice/UserSlice";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { fetchNotifications } from "../../apiCalls/NotificationAPI";
import Style from "./Navbar.module.css";

const Profile = ({ closeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector(
    (state) => state.notifications.notifications,
  );

  const { accessToken } = useSelector((state) => state.user);


  const unreadCount = Array.isArray(notifications)
    ? notifications.filter((n) => !n.is_read).length
    : 0;


  useEffect(() => {
    if (!accessToken) return;

    dispatch(fetchNotifications());

    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000); // every 30 seconds

    return () => clearInterval(interval);
  }, [dispatch, accessToken]);

  const handleLogout = () => {
    dispatch(logout());
    closeMenu?.();
    navigate("/login");
  };

  const profileData = [
    {
      name: (
        <div className={Style.notificationBell}>
          <FaBell size={20} />

          {unreadCount > 0 && (
            <span className={Style.notificationBadge}>
              {unreadCount}
            </span>
          )}
        </div>
      ),
      path: "/notifications",
    },
    {
      name: "My Profile",
      path: "/myProfile",
    },
  ];

  const loginSignUp = [
    {
      name: "Signup",
      path: "/",
    },
    {
      name: "Login",
      path: "/login",
    },
  ];

  return (
    <ul className={Style.profileMenu}>
      {accessToken ? (
        <>
          <NavProfile data={profileData} closeMenu={closeMenu}/>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      ) : (
        <NavProfile data={loginSignUp} closeMenu={closeMenu}/>
      )}
    </ul>
  );
};

export default Profile;