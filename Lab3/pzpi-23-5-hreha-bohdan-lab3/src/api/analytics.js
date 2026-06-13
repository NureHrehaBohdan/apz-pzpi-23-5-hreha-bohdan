import api from "./axios";

export const getRouteActivity = () =>
    api.get("/admin/analytics/route-activity");

export const getLoadForecast = () =>
    api.get("/admin/analytics/load-forecast");

export const getHourlyActivity = () =>
    api.get("/admin/analytics/hourly-activity");