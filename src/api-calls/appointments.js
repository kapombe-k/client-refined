import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getAppointments = async (appointmentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/appointments/${appointmentId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get appointment error:", error);
        throw error;
    }
};

export const createAppointment = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/appointments`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create appointment error:", error);
        throw error;
    }
};

export const updateAppointment = async (appointmentId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/appointments/${appointmentId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update appointment error:", error);
        throw error;
    }
};

export const deleteAppointment = async (appointmentId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/appointments/${appointmentId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete appointment error:", error);
        throw error;
    }
};
