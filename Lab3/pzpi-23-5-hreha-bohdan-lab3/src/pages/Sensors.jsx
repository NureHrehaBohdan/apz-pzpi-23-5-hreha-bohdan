import { useEffect, useState } from "react";
import { getSensors, createSensor, deleteSensor } from "../api/sensor";

export default function Sensors() {
    const [sensors, setSensors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        location: "",
        latitude: "",
        longitude: "",
        heightMeters: ""
    });
    const loadSensors = async () => {
        try {
            const res = await getSensors();
            setSensors(res.data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        const fetchSensors = async () => {
            setLoading(true);

            try {
                const res = await getSensors();
                setSensors(res.data.data);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchSensors();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleCreate = async () => {
        try {
            await createSensor({
                ...form,
                latitude: Number(form.latitude),
                longitude: Number(form.longitude),
                heightMeters: Number(form.heightMeters)
            });

            setForm({
                name: "",
                location: "",
                latitude: "",
                longitude: "",
                heightMeters: ""
            });

            await loadSensors();
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteSensor(id);
            setSensors((prev) => prev.filter((s) => s.id !== id));
        } catch (e) {
            console.log(e);
        }
    };

    if (loading) {
        return (
            <div className="page">
                <div className="panel">Loading sensors...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Sensors</h1>
                    <p className="page__subtitle">
                        Manage sensor records and keep the location data consistent.
                    </p>
                </div>

                <div className="status-pill status-pill--good">
                    {sensors.length} total
                </div>
            </header>

            <section className="panel stack">
                <h2 className="section-title">Create sensor</h2>

                <div className="form-grid">
                    <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
                    <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />
                    <input name="latitude" placeholder="Latitude" value={form.latitude} onChange={handleChange} />
                    <input name="longitude" placeholder="Longitude" value={form.longitude} onChange={handleChange} />
                    <input name="heightMeters" placeholder="Height, m" value={form.heightMeters} onChange={handleChange} />

                    <div className="form-actions">
                        <button onClick={handleCreate}>Create sensor</button>
                    </div>
                </div>
            </section>

            <section className="panel stack">
                <h2 className="section-title">Sensor list</h2>

                {sensors.length === 0 ? (
                    <p className="muted" style={{ margin: 0 }}>No sensors yet.</p>
                ) : (
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Lat</th>
                                    <th>Lng</th>
                                    <th>Height</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {sensors.map((s) => (
                                    <tr key={s.id}>
                                        <td>{s.id}</td>
                                        <td>{s.name}</td>
                                        <td>{s.location}</td>
                                        <td>{s.latitude}</td>
                                        <td>{s.longitude}</td>
                                        <td>{s.heightMeters}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button className="btn-danger" onClick={() => handleDelete(s.id)}>
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
