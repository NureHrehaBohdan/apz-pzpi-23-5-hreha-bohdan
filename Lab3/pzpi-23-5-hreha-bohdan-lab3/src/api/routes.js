import api from "./axios";

export const getRoutes = () =>
    api.get("/user/route");

export const createRoute = (data) =>
    api.post("/admin/route", data);

export const deleteRoute = (id) =>
    api.delete(`/admin/route/${id}`);

export const getAvgSpeed = (id) =>
    api.get(`/admin/route/${id}/avg-speed`);