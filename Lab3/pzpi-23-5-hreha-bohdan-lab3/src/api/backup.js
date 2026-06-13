import api from "./axios";

export const getBackups = () =>
    api.get("/admin/backup");

export const createBackup = () =>
    api.post("/admin/backup");

export const restoreBackup = (filename) =>
    api.post(`/admin/backup/${filename}/restore`);

export const deleteBackup = (filename) =>
    api.delete(`/admin/backup/${filename}`);