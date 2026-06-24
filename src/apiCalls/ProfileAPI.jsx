import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export const fetchProfile = createAsyncThunk(
  "user/fetchProfile",

  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        return rejectWithValue("Please login first");
      }

      const response = await fetch(`${BASEURL}/api/accounts/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result.detail || result.error || "Failed to fetch profile");
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Server Error");
    }
  },
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        return rejectWithValue("Please login first");
      }

      const response = await fetch(`${BASEURL}/api/accounts/profile/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await response.json();
      console.log("PROFILE UPDATE RESPONSE:", result);
      if (!response.ok) {
        return rejectWithValue(result.detail || result.error || result);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  },
);

export const deleteProfile = createAsyncThunk(
  "user/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access");

      if (!token) {
        return rejectWithValue("Please login first")
      }

      const response = await fetch(`${BASEURL}/api/accounts/profile/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const result = await response.json();
        return rejectWithValue(result.detail || "Delete Failed");
      }

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      return true;
    } catch (error) {
      return rejectWithValue(error.message || "Server Error");
    }
  },
);
