import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const login = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

export const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/profile`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Fetch user profile error:", error);
        throw error;
    }
};
