import API from "./axios";

export const getBillings = async () => {
    try {
        return await API.get("/billings");
    } catch (error) {
        console.error("Get billings error:", error);
        throw error;
    }
};

export const getBilling = async (id) => {
    try {
        return await API.get(`/billings/${id}`);
    } catch (error) {
        console.error("Get billing error:", error);
        throw error;
    }
};

export const createBilling = async (data) => {
    try {
        return await API.post("/billings", data);
    } catch (error) {
        console.error("Create billing error:", error);
        throw error;
    }
};

export const updateBilling = async (id, data) => {
    try {
        return await API.patch(`/billings/${id}`, data);
    } catch (error) {
        console.error("Update billing error:", error);
        throw error;
    }
};

export const deleteBilling = async (id) => {
    try {
        return await API.delete(`/billings/${id}`);
    } catch (error) {
        console.error("Delete billing error:", error);
        throw error;
    }
};
