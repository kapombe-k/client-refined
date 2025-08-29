import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getResources = async (resourceId) => {
    try {
        const response = await axios.get(`${BASE_URL}/resources/${resourceId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get resources error:", error);
        throw error;
    }
};

export const createResource = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/resources`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create resource error:", error);
        throw error;
    }
};

export const updateResource = async (resourceId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/resources/${resourceId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update resource error:", error);
        throw error;
    }
};

export const deleteResource = async (resourceId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/resources/${resourceId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete resource error:", error);
        throw error;
    }
};
