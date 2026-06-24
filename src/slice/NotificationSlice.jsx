import { createSlice } from "@reduxjs/toolkit";
import { fetchNotifications } from "../apiCalls/NotificationAPI";

const notificationSlice = createSlice({
  name: "notifications",

  initialState: {
    loading: false,
    notifications: [],
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.error = null;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload?.detail ||
          "Failed to fetch notifications";
        state.notifications = [];
      });
  },
});

export default notificationSlice.reducer;
