import API from "./axios";

export const getInventory = async () => {
    try {
        return await API.get("/inventory");
    } catch (error) {
        console.error("Get inventory error:", error);
        throw error;
    }
};

export const getInventoryItem = async (itemId) => {
    try {
        return await API.get(`/inventory/${itemId}`);
    } catch (error) {
        console.error("Get inventory item error:", error);
        throw error;
    }
};

export const createInventoryItem = async (data) => {
    try {
        return await API.post("/inventory", data);
    } catch (error) {
        console.error("Create inventory item error:", error);
        throw error;
    }
};

export const updateInventoryItem = async (itemId, data) => {
    try {
        return await API.patch(`/inventory/${itemId}`, data);
    } catch (error) {
        console.error("Update inventory item error:", error);
        throw error;
    }
};

export const deleteInventoryItem = async (itemId) => {
    try {
        return await API.delete(`/inventory/${itemId}`);
    } catch (error) {
        console.error("Delete inventory item error:", error);
        throw error;
    }
};
