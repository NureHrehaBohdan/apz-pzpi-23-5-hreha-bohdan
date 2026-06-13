import { useEffect, useState } from "react";
import {
    createRoute,
    deleteRoute,
    getAvgSpeed,
    getRoutes
} from "../api/routes";

export default function Routes() {
    const [routes, setRoutes] = useState([]);
    const [speeds, setSpeeds] = useState({});
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        difficultyLevel: "EASY",
        lengthKm: "",
        heightDrop: ""
    });

    const loadRoutes = async () => {
        try {
            const res = await getRoutes();
            setRoutes(res.data.data || []);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            try {
                const res = await getRoutes();
                setRoutes(res.data.data || []);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        void init();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = async () => {
        try {
            await createRoute({
                ...form,
                lengthKm: Number(form.lengthKm),
                heightDrop: Number(form.heightDrop)
            });

            setForm({
                name: "",
                difficultyLevel: "EASY",
                lengthKm: "",
                heightDrop: ""
            });

            await loadRoutes();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteRoute(id);
            await loadRoutes();
        } catch (e) {
            console.log(e);
        }
    };

    const loadSpeed = async (id) => {
        try {
            const res = await getAvgSpeed(id);
            setSpeeds((prev) => ({
                ...prev,
                [id]: res.data.data
            }));
        } catch (e) {
            console.log(e);
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="panel">Loading routes...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Routes</h1>
                    <p className="page__subtitle">
                        Keep route metadata readable and compare average speed at a glance.
                    </p>
                </div>

                <div className="status-pill status-pill--good">
                    {routes.length} total
                </div>
            </header>

            <section className="panel stack">
                <h2 className="section-title">Create route</h2>

                <div className="form-grid">
                    <input
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <select
                        name="difficultyLevel"
                        value={form.difficultyLevel}
                        onChange={handleChange}
                    >
                        <option value="EASY">EASY</option>
                        <option value="MEDIUM">MEDIUM</option>
                        <option value="HARD">HARD</option>
                    </select>

                    <input
                        name="lengthKm"
                        placeholder="Length km"
                        value={form.lengthKm}
                        onChange={handleChange}
                    />

                    <input
                        name="heightDrop"
                        placeholder="Height drop"
                        value={form.heightDrop}
                        onChange={handleChange}
                    />

                    <div className="form-actions">
                        <button onClick={handleCreate}>Create route</button>
                    </div>
                </div>
            </section>

            <section className="stack">
                {routes.length === 0 ? (
                    <div className="panel">
                        <p className="muted" style={{ margin: 0 }}>No routes found.</p>
                    </div>
                ) : (
                    routes.map((r) => (
                        <div key={r.id} className="panel">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "1rem",
                                    alignItems: "flex-start",
                                    flexWrap: "wrap"
                                }}
                            >
                                <div>
                                    <h3 style={{ margin: "0 0 0.35rem" }}>{r.name}</h3>
                                    <div className="badge" style={{ background: "#eef4ff", color: "#1f4db6" }}>
                                        {r.difficultyLevel}
                                    </div>
                                    <p className="muted" style={{ margin: "0.8rem 0 0" }}>
                                        {r.lengthKm} km · {r.heightDrop} m descent
                                    </p>
                                </div>

                                <div style={{ display: "grid", gap: "0.7rem", justifyItems: "end" }}>
                                    <div className="table-actions">
                                        <button className="btn-secondary" onClick={() => loadSpeed(r.id)}>
                                            Avg speed
                                        </button>

                                        <button className="btn-danger" onClick={() => handleDelete(r.id)}>
                                            Delete
                                        </button>
                                    </div>

                                    {speeds[r.id] !== undefined && (
                                        <div className="status-pill status-pill--good">
                                            {speeds[r.id].toFixed(2)} km/h
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </div>
    );
}
