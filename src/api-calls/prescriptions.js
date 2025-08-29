import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getPrescriptions = async (patientId) => {
    try {
        const response = await axios.get(`${BASE_URL}/prescriptions/${patientId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get prescriptions error:", error);
        throw error;
    }
};

export const getPrescription = async (prescriptionId) => {
    try {
        const response = await axios.get(`${BASE_URL}/prescriptions/${prescriptionId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get prescription error:", error);
        throw error;
    }
};

export const createPrescription = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/prescriptions`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create prescription error:", error);
        throw error;
    }
};

export const updatePrescription = async (prescriptionId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/prescriptions/${prescriptionId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update prescription error:", error);
        throw error;
    }
};

export const deletePrescription = async (prescriptionId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/prescriptions/${prescriptionId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete prescription error:", error);
        throw error;
    }
};
