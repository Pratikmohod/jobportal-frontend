import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  loginUser,
  fetchUsers,
  addConnection,
  removeConnection,
} from "../apiCalls/UserApi";
import {
  deleteProfile,
  editProfile,
  fetchProfile,
} from "../apiCalls/ProfileAPI";
import { act } from "react";
let initialState = {
  loading: false,
  users: [],
  singleUser: null,
  addResponse: null,
  accessToken: localStorage.getItem("access") || null,
  refreshToken: localStorage.getItem("refresh") || null,
  validationError: null,
  error: null,
  success: null,
};

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.singleUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.validationError = null;
      state.success = null;
      state.addResponse = null;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
    clearAddResponse: (state) => {
      state.addResponse = null;
    },
    clearMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder

      //ADD USER
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.validationError = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.addResponse = action?.payload;
        state.validationError = null;
        state.success = "Registration Successful";
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;

        state.validationError =
          action.payload && typeof action.payload === "object"
            ? action.payload
            : { non_field_errors: [action.payload || "Registration failed"] };
      })

      // LOGIN

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.loading = false;
        state.error = null;

        localStorage.setItem("access", action.payload.access);
        localStorage.setItem("refresh", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload?.detail) {
          state.error = "Wrong username or password";
        } else {
          state.error = "Login failed";
        }
        state.loading = false;
      })

      // Fetch Profile

      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.error =
          action.payload?.detail ||
          action.payload?.message ||
          "Failed to fetch profile";
        state.loading = false;
      })

      // EDIT PROFILE

      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.singleUser = action.payload;
        state.loading = false;
        state.error = null;
        state.success = "Profile Updated Successfully";
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.error =
          action.payload?.detail ||
          action.payload?.message ||
          "Failed to update profile";
        state.loading = false;
      })

      // DELETE PROFILE

      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(deleteProfile.fulfilled, (state) => {
        state.singleUser = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.loading = false;
        state.success = "Account Deleted Successfully";
      })
      .addCase(deleteProfile.rejected, (state, action) => {
        state.error =
          action.payload?.detail ||
          action.payload?.message ||
          "Failed to delete profile";
        state.loading = false;
      })

      // FETCH USERS

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log("Redux Payload:", action.payload);
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.users = [];
        state.error =
          action.payload?.detail ||
          action.payload?.message ||
          "Failed to fetch users";
      })

      // ADD Connetion

      .addCase(addConnection.fulfilled, (state, action) => {
        if (state.singleUser) {
          state.singleUser.connections.push(action.payload);
        }
      })

      // REMOVE Connection

      .addCase(removeConnection.fulfilled, (state, action) => {
        if (state.singleUser) {
          state.singleUser.connections = state.singleUser.connections.filter(
            (id) => id !== action.payload,
          );
        }
      });
  },
});

export let { logout, clearAddResponse, clearMessages } = userSlice.actions;
export default userSlice.reducer;
