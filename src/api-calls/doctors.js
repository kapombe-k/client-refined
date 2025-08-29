import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getDoctors = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/doctors`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get doctors error:", error);
        throw error;
    }
};

export const createDoctor = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/doctors`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create doctor error:", error);
        throw error;
    }
};

export const updateDoctor = async (doctorId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/doctors/${doctorId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update doctor error:", error);
        throw error;
    }
};

export const deleteDoctor = async (doctorId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/doctors/${doctorId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete doctor error:", error);
        throw error;
    }
};
