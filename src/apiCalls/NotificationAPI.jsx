import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async (_, {rejectWithValue} ) => {
        try {
            const response = await fetch(
                `${BASEURL}/api/notifications/mynotification/`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                }

            );
            const result = await response.json();

            if (!response.ok) {
                return rejectWithValue(result);
            }

            return result.results;
        } catch {
            return rejectWithValue({
                error: "Server Error",
            })
        }
    } 
)

export const markNotificationsRead = async () => {
  try {
    await fetch(`${BASEURL}/api/notifications/mark-read/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};