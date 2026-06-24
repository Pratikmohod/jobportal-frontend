import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications, markNotificationsRead } from "../../apiCalls/NotificationAPI";
import Style from "./Notifications.module.css";
const Notifications = () => {
  const dispatch = useDispatch();

  const { notifications, loading, error } = useSelector(
    (state) => state.notifications,
  );

  useEffect(() => {
  const loadNotifications = async () => {
    await markNotificationsRead();

    await dispatch(fetchNotifications());
  };

  loadNotifications();
}, [dispatch]);


  return (
    <div className={Style.container}>
      <h1 className={Style.title}>Notifications</h1>

      {loading && <h3 className={Style.loading}>Loading...</h3>}

      {notifications?.length === 0 && (
        <p className={Style.empty}>No notifications yet.</p>
      )}

      <div className={Style.notificationList}>
        {notifications?.map((item) => (
          <div key={item.id} className={Style.card}>
            <p className={Style.message}>{item.message}</p>

            <small className={Style.time}>
              {new Date(item.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
