import { Toast } from "@base-ui-components/react";
import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

API.interceptors.request.use((config) => {
    // Add any custom headers or configurations here -jwt from localStorage
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    // Handle request errors here
    if (error.response?.status === 401) {
        Toast.error("Unauthorized access. Please log in.");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});


API.interceptors.response.use((response) => {
    // Handle successful responses here
    const { data } = response;
    if (token) {
        localStorage.setItem("token", data.token);
        API.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    }
    return data;
}, (error) => {
    if (error.response?.status === 401) {
        Toast.error("Session expired. Please log in.");
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default API;
