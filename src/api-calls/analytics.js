import axios from "axios";
import { BASE_URL } from "@/utils/utils";

export const getAnalyticsData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/analytics`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Get analytics data error:", error);
        throw error;
    }
};
