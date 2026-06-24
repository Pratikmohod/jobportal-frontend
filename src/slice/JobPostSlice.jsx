import { createSlice } from "@reduxjs/toolkit";
import { addJob, fetchJobs } from "../apiCalls/JobPost";

let initialState = {
  jobs: [],
  singleJob: null,
  loading: false,
  error: null,
  responseCode: null,
  count: 0,
  next: null,
  previous: null,
};
let JobPostSlice = createSlice({
  name: "jobPost",
  initialState,
  reducers: {
    fetchSingleJob: (state, action) => {
      let findSingleJob = state.jobs.find((job) => job.id === action.payload);
      if (findSingleJob !== undefined) {
        state.singleJob = findSingleJob;
      }
    },
    responseCodeChange: (state) => {
      state.responseCode = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.responseCode = action.payload;
        state.loading = false;
      })
      .addCase(addJob.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.jobs = action.payload.results;
        state.loading = false;
        state.count = action.payload.count;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false
      });
  },
});

export let { fetchSingleJob, responseCodeChange } = JobPostSlice.actions;
export default JobPostSlice.reducer;
