import { Toast } from "@base-ui-components/react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";

const API = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Send cookies with requests
});

// Request interceptor for error handling
API.interceptors.request.use((config) => {
    return config;
}, (error) => {
    // Handle request errors
    if (error.response?.status === 401) {
        Toast.error("Unauthorized access. Please log in.");
        // Clear any stored auth data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

// Response interceptor for error handling and data extraction
API.interceptors.response.use((response) => {
    // Return data directly for cleaner API usage
    return response.data;
}, (error) => {
    // Handle authentication errors
    if (error.response?.status === 401) {
        Toast.error("Session expired. Please log in again.");
        // Clear stored auth data
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
    }
    // Handle other common errors
    else if (error.response?.status === 403) {
        Toast.error("Access denied. Insufficient permissions.");
    }
    else if (error.response?.status === 500) {
        Toast.error("Server error. Please try again later.");
    }
    else if (error.response?.status >= 400) {
        const message = error.response?.data?.message || error.response?.data?.error || "An error occurred";
        Toast.error(message);
    }

    return Promise.reject(error);
});

export default API;
