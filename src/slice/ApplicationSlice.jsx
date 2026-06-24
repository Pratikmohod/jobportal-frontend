import { createSlice } from "@reduxjs/toolkit";
import { applyJob,fetchMyApplications,fetchRecruiterApplications,updateApplicationStatus } from "../apiCalls/ApplicationApi";

const initialState = {
    loading :false,
    applications: [],
    responseCode:null,
    success:null,
    error:null,

};

const applicationSlice = createSlice({
    name: "applications",
    initialState,
    reducers: {
        clearMessage: (state) => {
            state.success = null;
            state.error = null;
        }
    },
    extraReducers:(builder) => {
        builder 

        .addCase(applyJob.pending, (state) => {
            state.loading = true;
            state.error = null;

        })
        .addCase(applyJob.fulfilled, (state, action) => {
            state.loading = false;
            state.responseCode = action.payload;
            state.success = "Application Submitted Successfully"
        })
        .addCase(applyJob.rejected, (state,action) => {
            state.loading = false;
            state.error =
            action.payload?.message || "Failed to apply";

        })

        // My Applications

        .addCase(fetchMyApplications.pending, (state) => {
            state.loading = true;

        })
        .addCase(fetchMyApplications.fulfilled, (state, action) => {
            state.loading = false;
            state.applications = action.payload?.results;

        })
        .addCase(fetchMyApplications.rejected, (state) => {
            state.loading = false;

        })

        // Recruiter Applications

        .addCase(fetchRecruiterApplications.pending, (state) => {
            state.loading = true;

        })
        .addCase(fetchRecruiterApplications.fulfilled, (state, action) => {
            state.loading = false;
            state.applications = action.payload?.results;

        })
        .addCase(fetchRecruiterApplications.rejected, (state) => {
            state.loading = false;

        })


        // Update Status

        .addCase(updateApplicationStatus.fulfilled, (state, action) => {
            const index = state.applications.findIndex(
                (app) => app.id === action.payload.id
            );

            if (index !== -1) {
                state.applications[index] = action.payload;
            }

        });
        
    },
});

export const {clearMessage} = applicationSlice.actions;
export default applicationSlice.reducer;