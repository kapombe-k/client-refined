import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getVisits = async (patientId) => {
    try {
        const response = await axios.get(`${BASE_URL}/visits/${patientId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get visits error:", error);
        throw error;
    }
};

export const getVisit = async (visitId) => {
    try {
        const response = await axios.get(`${BASE_URL}/visits/${visitId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get visit error:", error);
        throw error;
    }
};

export const createVisit = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/visits`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create visit error:", error);
        throw error;
    }
};

export const updateVisit = async (visitId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/visits/${visitId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update visit error:", error);
        throw error;
    }
};

export const deleteVisit = async (visitId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/visits/${visitId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete visit error:", error);
        throw error;
    }
};
