import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";

export let addUser = createAsyncThunk(
  "users/addUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASEURL}/api/accounts/register/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return {
        status: response.status,
        data: result,
      };
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  }
);

export let loginUser = createAsyncThunk(
  "users/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASEURL}/api/accounts/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        return rejectWithValue(result);
      }

      localStorage.setItem("access", result.access);
      localStorage.setItem("refresh", result.refresh);

      return result;
    } catch (error) {
      return rejectWithValue({
        detail: "Server Error",
      });
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async({search = "", role = "all" } = {}, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASEURL}/api/accounts/users/?search=${search}&role=${role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      const result =await response.json();
      

      if (!response.ok) {
        return rejectWithValue(result);
      }

      return result;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  }
);

export const addConnection = createAsyncThunk(
  "users/addConnection",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
      `${BASEURL}/api/accounts/connection/add/${id}/`,
      {
        method: "POST",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }
      return id;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  }

  
);

export const removeConnection = createAsyncThunk(
  "users/removeConnection",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
      `${BASEURL}/api/accounts/connection/remove/${id}/`,
      {
        method: "DELETE",
        headers:{
          Authorization:`Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

      const result = await response.json();

      if (!response.ok) {
        return rejectWithValue(result);
      }
      return id;
    } catch (error) {
      return rejectWithValue({
        error: "Server Error",
      });
    }
  }
  
);


