import API from "./axios";

export const getPatients = async () => {
    try {
        return await API.get("/patients");
    } catch (error) {
        console.error("Get patients error:", error);
        throw error;
    }
};

export const createPatient = async (data) => {
    try {
        return await API.post("/patients", data);
    } catch (error) {
        console.error("Create patient error:", error);
        throw error;
    }
};

export const updatePatient = async (patientId, data) => {
    try {
        return await API.patch(`/patients/${patientId}`, data);
    } catch (error) {
        console.error("Update patient error:", error);
        throw error;
    }
};

export const deletePatient = async (patientId) => {
    try {
        return await API.delete(`/patients/${patientId}`);
    } catch (error) {
        console.error("Delete patient error:", error);
        throw error;
    }
};

export const searchPatients = async (searchParams = {}) => {
    try {
        // Build query string from search parameters
        const params = new URLSearchParams();

        Object.entries(searchParams).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.append(key, value);
            }
        });

        const queryString = params.toString();
        const url = queryString ? `/patients/search?${queryString}` : '/patients/search';

        return await API.get(url);
    } catch (error) {
        console.error("Search patients error:", error);
        throw error;
    }
};
