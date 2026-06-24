import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  addConnection,
  removeConnection,
} from "../../apiCalls/UserApi";
import { fetchProfile } from "../../apiCalls/ProfileAPI";
import Style from "./Mynetwork.module.css";
import UserCard from "./UserCard";

const Mynetwork = () => {
  const dispatch = useDispatch();

  const { users, singleUser, loading } = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  useEffect(() => {
    dispatch(
      fetchUsers({
        search,
        role,
      }),
    );
    dispatch(fetchProfile());
  }, [dispatch, search, role]);

  const handleAddConnection = async (id) => {
    await dispatch(addConnection(id));
    dispatch(fetchProfile());
  };

  const handleRemoveConnection = async (id) => {
    await dispatch(removeConnection(id));
    dispatch(fetchProfile());
  };

  const userList = users?.results || [];

  const connectedUsers = userList.filter((user) =>
    singleUser?.connections?.includes(user.id),
  );

  const suggestedUsers = userList.filter(
    (user) => !singleUser?.connections?.includes(user.id),
  );

  return (
    <div className={Style.container}>
      <h1 className={Style.pageTitle}>My Network</h1>

      <div className={Style.filterContainer}>
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={Style.searchInput}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className={Style.roleSelect}
        >
          <option value="all">All Roles</option>
          <option value="jobseeker">Job Seeker</option>
          <option value="hiring">Hiring</option>
        </select>
      </div>

      {loading && <h2 className={Style.loading}>Loading Users...</h2>}

      {!loading && (
        <>
          {/* Connections Section */}
          <h2 className={Style.sectionTitle}>My Connections</h2>

          {connectedUsers.length === 0 ? (
            <p className={Style.emptyMessage}>No Connections Yet</p>
          ) : (
            <div className={Style.networkGrid}>
              {connectedUsers.map((user) => (
                <UserCard key={user.id} user={user} isConnected={true} handleAddConnection={handleAddConnection} handleRemoveConnection={handleRemoveConnection}/>
              ))}
            </div>
          )}

          {/* Suggestions Section */}
          <h2 className={Style.sectionTitle}>People You May Know</h2>

          {suggestedUsers.length === 0 ? (
            <p className={Style.emptyMessage}>No More Suggestions</p>
          ) : (
            <div className={Style.networkGrid}>
              {suggestedUsers.map((user) => (
                <UserCard key={user.id} user={user} isConnected={false} handleAddConnection={handleAddConnection} handleRemoveConnection={handleRemoveConnection} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Mynetwork;
