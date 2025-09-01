import API from "./axios";

export const getPrescriptions = async () => {
    try {
        return await API.get("/prescriptions");
    } catch (error) {
        console.error("Get prescriptions error:", error);
        throw error;
    }
};

export const getPrescription = async (prescriptionId) => {
    try {
        return await API.get(`/prescriptions/${prescriptionId}`);
    } catch (error) {
        console.error("Get prescription error:", error);
        throw error;
    }
};

export const createPrescription = async (data) => {
    try {
        return await API.post("/prescriptions", data);
    } catch (error) {
        console.error("Create prescription error:", error);
        throw error;
    }
};

export const updatePrescription = async (prescriptionId, data) => {
    try {
        return await API.patch(`/prescriptions/${prescriptionId}`, data);
    } catch (error) {
        console.error("Update prescription error:", error);
        throw error;
    }
};

export const deletePrescription = async (prescriptionId) => {
    try {
        return await API.delete(`/prescriptions/${prescriptionId}`);
    } catch (error) {
        console.error("Delete prescription error:", error);
        throw error;
    }
};
