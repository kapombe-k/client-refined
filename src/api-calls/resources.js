import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getResource = async (resource) => {
    try {
        const response = await axios.get(`${BASE_URL}/${resource}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get resource error:", error);
        throw error;
    }
};

export const createResource = async (resource, data) => {
    try {
        const response = await axios.post(`${BASE_URL}/${resource}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create resource error:", error);
        throw error;
    }
};

export const updateResource = async (resource, id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/${resource}/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update resource error:", error);
        throw error;
    }
};

export const deleteResource = async (resource, id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/${resource}/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete resource error:", error);
        throw error;
    }
};
