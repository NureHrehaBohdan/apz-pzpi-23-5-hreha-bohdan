import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getTodayReports } from "../api/reports";
import "leaflet/dist/leaflet.css";

export default function Reports() {
    const [today, setToday] = useState([]);
    const [tab, setTab] = useState("table");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getTodayReports();
                setToday(res.data.data || []);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        load();
        const interval = setInterval(load, 30000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="page">
                <div className="panel">Loading reports...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">User Reports</h1>
                    <p className="page__subtitle">
                        Switch between a compact table and the map view.
                    </p>
                </div>
            </header>

            <section className="tabs">
                <button className={`tab ${tab === "table" ? "tab--active" : ""}`} onClick={() => setTab("table")}>
                    Table
                </button>
                <button className={`tab ${tab === "map" ? "tab--active" : ""}`} onClick={() => setTab("map")}>
                    Map
                </button>
            </section>

            {tab === "table" && (
                <section className="panel stack">
                    <h2 className="section-title">Today&apos;s reports</h2>

                    {today.length === 0 ? (
                        <p className="muted" style={{ margin: 0 }}>No reports today.</p>
                    ) : (
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Description</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {today.map((r, i) => (
                                        <tr key={i}>
                                            <td>{r.user?.id ?? "—"}</td>
                                            <td>{r.description}</td>
                                            <td>{r.latitude}</td>
                                            <td>{r.longitude}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            )}

            {tab === "map" && (
                <section className="panel stack">
                    <h2 className="section-title">Reports map</h2>

                    <div style={{ height: "75vh", minHeight: 360 }}>
                        <MapContainer
                            center={[46.8, 10.1]}
                            zoom={10}
                            style={{ height: "100%", width: "100%", borderRadius: 12 }}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                            {today.map((r, i) => (
                                <Marker key={i} position={[r.latitude, r.longitude]}>
                                    <Popup>
                                        <strong>Report</strong>
                                        <p>{r.description}</p>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </section>
            )}
        </div>
    );
}
