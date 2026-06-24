import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./../slice/UserSlice";
import JobPostSlice from "../slice/JobPostSlice"
import applicationSlice from "../slice/ApplicationSlice"
import notificationSlice from "../slice/NotificationSlice"
let store = configureStore({
    reducer: {
        user: userSlice,
        jobs: JobPostSlice,
        applications: applicationSlice,
        notifications: notificationSlice,
        
    },
});

export default store