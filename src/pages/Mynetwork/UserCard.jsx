import React from "react";
import Style from "./Mynetwork.module.css";

const UserCard = ({
  user,
  isConnected,
  handleAddConnection,
  handleRemoveConnection,
}) => {
  return (
    <div className={Style.profileCard}>
      <div className={Style.header}>
        <div className={Style.avatar}>
          {user.username?.charAt(0).toUpperCase()}
        </div>

        <h2>{user.username}</h2>
        <p>{user.role || "User"}</p>
      </div>

      <div className={Style.infoContainer}>
        <div className={Style.infoItem}>
          <span>Email</span>
          <p>{user.email}</p>
        </div>

        <div className={Style.infoItem}>
          <span>Mobile No</span>
          <p>{user.mobile_no || "Not Added"}</p>
        </div>

        <div className={Style.infoItem}>
          <span>Gender</span>
          <p>{user.gender || "Not Added"}</p>
        </div>

        <div className={Style.infoItem}>
          <span>Date of Birth</span>
          <p>{user.dob || "Not Added"}</p>
        </div>

        <p className={Style.mutualConnections}>
          {user.mutual_connections} Mutual Connections
        </p>

        <div className={Style.BtnContainer}>
          {isConnected ? (
            <button
              className={Style.removeBtn}
              onClick={() => handleRemoveConnection(user.id)}
            >
              Remove Connection
            </button>
          ) : (
            <button
              className={Style.connectBtn}
              onClick={() => handleAddConnection(user.id)}
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
