import { useEffect, useState } from "react";
import {
    getBackups,
    createBackup,
    restoreBackup,
    deleteBackup
} from "../api/backup";

export default function Backups() {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadBackups = async () => {
        try {
            const res = await getBackups();
            setBackups(res.data.data || []);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                const res = await getBackups();
                setBackups(res.data.data || []);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        void init();
    }, []);

    const handleCreate = async () => {
        try {
            await createBackup();
            await loadBackups();
        } catch (e) {
            console.log(e);
        }
    };

    const handleRestore = async (filename) => {
        try {
            await restoreBackup(filename);
            alert("Restored successfully");
        } catch (e) {
            console.log(e);
        }
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        date.setHours(date.getHours() + 3);

        return date.toLocaleString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatSize = (sizeMb) => {
        if (!sizeMb) return "—";
        if (sizeMb < 1) return `${(sizeMb * 1024).toFixed(0)} KB`;
        return `${sizeMb.toFixed(1)} MB`;
    };

    const handleDelete = async (filename) => {
        const ok = window.confirm("Delete this backup?");
        if (!ok) return;

        try {
            await deleteBackup(filename);
            await loadBackups();
        } catch (e) {
            console.log(e);
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="panel">Loading backups...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Backups</h1>
                    <p className="page__subtitle">
                        Create, restore and delete database snapshots from one place.
                    </p>
                </div>

                <div className="page__actions">
                    <button onClick={handleCreate}>Create backup</button>
                </div>
            </header>

            <section className="panel stack">
                {backups.length === 0 ? (
                    <p className="muted" style={{ margin: 0 }}>No backups found.</p>
                ) : (
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Filename</th>
                                    <th>Date</th>
                                    <th>Size</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {backups.map((b) => (
                                    <tr key={b.filename}>
                                        <td>{b.filename}</td>
                                        <td>{formatDate(b.createdAt)}</td>
                                        <td>{formatSize(b.sizeMb)}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="btn-secondary" onClick={() => handleRestore(b.filename)}>
                                                    Restore
                                                </button>
                                                <button className="btn-danger" onClick={() => handleDelete(b.filename)}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}
