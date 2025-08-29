import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getPatients = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/patients`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get patients error:", error);
        throw error;
    }
};

export const createPatient = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/patients`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create patient error:", error);
        throw error;
    }
};

export const updatePatient = async (patientId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/patients/${patientId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update patient error:", error);
        throw error;
    }
};

export const deletePatient = async (patientId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/patients/${patientId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete patient error:", error);
        throw error;
    }
};
