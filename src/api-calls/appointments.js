import API from "./axios";

export const getAppointments = async () => {
    try {
        return await API.get("/appointments");
    } catch (error) {
        console.error("Get appointments error:", error);
        throw error;
    }
};

export const getAppointment = async (appointmentId) => {
    try {
        return await API.get(`/appointments/${appointmentId}`);
    } catch (error) {
        console.error("Get appointment error:", error);
        throw error;
    }
};

export const createAppointment = async (data) => {
    try {
        return await API.post("/appointments", data);
    } catch (error) {
        console.error("Create appointment error:", error);
        throw error;
    }
};

export const updateAppointment = async (appointmentId, data) => {
    try {
        return await API.patch(`/appointments/${appointmentId}`, data);
    } catch (error) {
        console.error("Update appointment error:", error);
        throw error;
    }
};

export const deleteAppointment = async (appointmentId) => {
    try {
        return await API.delete(`/appointments/${appointmentId}`);
    } catch (error) {
        console.error("Delete appointment error:", error);
        throw error;
    }
};
