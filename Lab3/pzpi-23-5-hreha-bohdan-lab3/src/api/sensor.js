import api from "./axios";

export const getSensors = () => api.get("/admin/sensor");

export const createSensor = (data) =>
    api.post("/admin/sensor", data);

export const deleteSensor = (id) =>
    api.delete(`/admin/sensor/${id}`);