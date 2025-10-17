import API from "./axios";

export const getAnalyticsData = async (reportType = "revenue") => {
    try {
        return await API.get(`/analytics/${reportType}`);
    } catch (error) {
        console.error("Get analytics data error:", error);
        throw error;
    }
};

export const getDashboardAnalytics = async () => {
    try {
        return await API.get("/analytics/dashboard");
    } catch (error) {
        console.error("Get dashboard analytics error:", error);
        throw error;
    }
};
