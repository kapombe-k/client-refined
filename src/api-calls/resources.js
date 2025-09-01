import API from "./axios";

export const getResource = async (resource) => {
    try {
        return await API.get(`/${resource}`);
    } catch (error) {
        console.error("Get resource error:", error);
        throw error;
    }
};

export const createResource = async (resource, data) => {
    try {
        return await API.post(`/${resource}`, data);
    } catch (error) {
        console.error("Create resource error:", error);
        throw error;
    }
};

export const updateResource = async (resource, id, data) => {
    try {
        return await API.patch(`/${resource}/${id}`, data);
    } catch (error) {
        console.error("Update resource error:", error);
        throw error;
    }
};

export const deleteResource = async (resource, id) => {
    try {
        return await API.delete(`/${resource}/${id}`);
    } catch (error) {
        console.error("Delete resource error:", error);
        throw error;
    }
};
