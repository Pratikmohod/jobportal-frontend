import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASEURL } from "../utilities";


export const applyJob = createAsyncThunk(
    "application/applyJob",
    async (data, {rejectWithValue}) => {
        try {
        const token = localStorage.getItem("access");

        const response = await fetch(`${BASEURL}/api/applications/apply/`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data),

        }
    );

    const result = await response.json();

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

export const fetchMyApplications = createAsyncThunk(
    "application/fetchMyApplications",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${BASEURL}/api/applications/my-application/`,
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
                error: "Server Error"
            });
        }
    }
);


export const fetchRecruiterApplications = createAsyncThunk(
    "application/fetchRecruiterApplications",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${BASEURL}/api/applications/received-applications/`,
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
                error: "Server Error"
            });
        }
    }


);



export const updateApplicationStatus = createAsyncThunk(
    "application/updateApplicationStatus",
    async ({id, status }, { rejectWithValue }) => {
        try {
            const response = await fetch(
                `${BASEURL}/api/applications/update-status/${id}/`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const result =await response.json();

            if (!response.ok) {
                return rejectWithValue(result);

            }

            return result;

        } catch (error) {
            return rejectWithValue({
                error: "Server Error"
            });
        }
    }


);