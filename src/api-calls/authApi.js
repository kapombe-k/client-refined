import API from "./axios";

export const login = async (data) => {
    try {
        return await API.post("/auth/login", data);
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        return await API.post("/auth/logout");
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
};

export const register = async (data) => {
    try {
        return await API.post("/auth/register", data);
    } catch (error) {
        console.error("Register error:", error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        return await API.post("/auth/refresh-token");
    } catch (error) {
        console.error("Token refresh error:", error);
        throw error;
    }
};
