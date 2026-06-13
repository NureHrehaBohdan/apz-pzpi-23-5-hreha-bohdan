import api from "./axios";

export const getLatestReading = () =>
    api.get("/api/aggregator/latest");

export const getAggregatorHistory = () =>
    api.get("/api/aggregator/history");

export const updateAggregatorConfig = (config) =>
    api.post("/api/aggregator/config", config, {
        headers: {
            "Content-Type": "application/json"
        }
    });