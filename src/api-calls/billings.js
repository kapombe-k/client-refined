import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getBillings = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/billings/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get billing error:", error);
        throw error;
    }
};

export const createBilling = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/billings`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create billing error:", error);
        throw error;
    }
};

export const updateBilling = async (id, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/billings/${id}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update billing error:", error);
        throw error;
    }
};

export const deleteBilling = async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/billings/${id}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete billing error:", error);
        throw error;
    }
};
