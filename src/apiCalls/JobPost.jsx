import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";
import { data } from "react-router-dom";

export const addJob = createAsyncThunk(
  "jobs/addJob",
  async (data, thunkAPI) => {
    const token = localStorage.getItem("access");

    const response = await fetch(`${BASEURL}/api/jobs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return response.status;
  },
);

export let fetchJobs = createAsyncThunk(
  "jobs/fetchJobs", 
  async (page = 1) => {
  let response = await fetch(`${BASEURL}/api/jobs/?page=${page}`);
  let responseData = await response.json();
  return responseData;
});
