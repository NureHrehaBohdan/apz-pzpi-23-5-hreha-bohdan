import api from "./axios";

export const getUserReport = (userId) =>
    api.get(`/admin/report/${userId}`);

export const getTodayReports = () =>
    api.get(`/admin/report/today`);

