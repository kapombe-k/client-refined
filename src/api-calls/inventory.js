import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getInventory = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/inventory`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get inventory error:", error);
        throw error;
    }
};

export const getInventoryItem = async (itemId) => {
    try {
        const response = await axios.get(`${BASE_URL}/inventory/${itemId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get inventory item error:", error);
        throw error;
    }
};

export const createInventoryItem = async (data) => {
    try {
        const response = await axios.post(`${BASE_URL}/inventory`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Create inventory item error:", error);
        throw error;
    }
};

export const updateInventoryItem = async (itemId, data) => {
    try {
        const response = await axios.put(`${BASE_URL}/inventory/${itemId}`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Update inventory item error:", error);
        throw error;
    }
};

export const deleteInventoryItem = async (itemId) => {
    try {
        const response = await axios.delete(`${BASE_URL}/inventory/${itemId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Delete inventory item error:", error);
        throw error;
    }
};
