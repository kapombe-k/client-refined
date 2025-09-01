import API from "./axios";

export const getDoctors = async () => {
    try {
        return await API.get("/doctors");
    } catch (error) {
        console.error("Get doctors error:", error);
        throw error;
    }
};

export const getDoctor = async (doctorId) => {
    try {
        return await API.get(`/doctors/${doctorId}`);
    } catch (error) {
        console.error("Get doctor error:", error);
        throw error;
    }
};

export const createDoctor = async (data) => {
    try {
        return await API.post("/doctors", data);
    } catch (error) {
        console.error("Create doctor error:", error);
        throw error;
    }
};

export const updateDoctor = async (doctorId, data) => {
    try {
        return await API.patch(`/doctors/${doctorId}`, data);
    } catch (error) {
        console.error("Update doctor error:", error);
        throw error;
    }
};

export const deleteDoctor = async (doctorId) => {
    try {
        return await API.delete(`/doctors/${doctorId}`);
    } catch (error) {
        console.error("Delete doctor error:", error);
        throw error;
    }
};
