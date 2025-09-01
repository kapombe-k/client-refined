import API from "./axios";

export const getVisits = async () => {
    try {
        return await API.get("/visits");
    } catch (error) {
        console.error("Get visits error:", error);
        throw error;
    }
};

export const getVisit = async (visitId) => {
    try {
        return await API.get(`/visits/${visitId}`);
    } catch (error) {
        console.error("Get visit error:", error);
        throw error;
    }
};

export const createVisit = async (data) => {
    try {
        return await API.post("/visits", data);
    } catch (error) {
        console.error("Create visit error:", error);
        throw error;
    }
};

export const updateVisit = async (visitId, data) => {
    try {
        return await API.patch(`/visits/${visitId}`, data);
    } catch (error) {
        console.error("Update visit error:", error);
        throw error;
    }
};

export const deleteVisit = async (visitId) => {
    try {
        return await API.delete(`/visits/${visitId}`);
    } catch (error) {
        console.error("Delete visit error:", error);
        throw error;
    }
};
