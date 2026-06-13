import { useEffect, useState } from "react";
import { getAggregatorHistory, getLatestReading } from "../api/aggregator";
import WeatherChart from "../components/WeatherChart";

export default function Weather() {
    const [history, setHistory] = useState([]);
    const [latest, setLatest] = useState(null);
    const [tab, setTab] = useState("overview");
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const [h, l] = await Promise.all([
                    getAggregatorHistory(),
                    getLatestReading()
                ]);

                const sortedHistory = h.data.data.sort(
                    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
                );

                setHistory(sortedHistory);
                setLatest(l.data.data);
                setLastUpdate(new Date());
            } catch (e) {
                console.log(e);
            }
        };

        load();
        const interval = setInterval(load, 5000);
        return () => clearInterval(interval);
    }, []);

    const statusClass = (status) => {
        if (status === "GOOD") return "status-pill--good";
        if (status === "WARNING") return "status-pill--warning";
        return "status-pill--bad";
    };

    const valueColor = (status) => {
        if (status === "GOOD") return "#147a4a";
        if (status === "WARNING") return "#9a6500";
        return "#b42318";
    };

    const renderChart = (key, color, label) => (
        <WeatherChart data={history} dataKey={key} color={color} label={label} />
    );

    if (!latest) {
        return (
            <div className="page">
                <div className="panel">Loading weather...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Weather Dashboard</h1>
                    <p className="page__subtitle">
                        Last update: {lastUpdate ? lastUpdate.toLocaleTimeString() : "Loading..."}
                    </p>
                </div>

                <div className={`status-pill ${statusClass(latest.overallStatus)}`}>
                    {latest.overallStatus}
                </div>
            </header>

            <section className="grid-4">
                <div className="panel">
                    <p className="muted" style={{ marginTop: 0 }}>Temperature</p>
                    <h2 style={{ margin: "0.25rem 0 0.5rem", color: valueColor(latest.tempStatus) }}>
                        {latest.tempAverage}°C
                    </h2>
                    <div className={`status-pill ${statusClass(latest.tempStatus)}`}>
                        {latest.tempStatus}
                    </div>
                </div>

                <div className="panel">
                    <p className="muted" style={{ marginTop: 0 }}>Wind</p>
                    <h2 style={{ margin: "0.25rem 0 0.5rem", color: valueColor(latest.windStatus) }}>
                        {latest.windAverage} m/s
                    </h2>
                    <div className={`status-pill ${statusClass(latest.windStatus)}`}>
                        {latest.windStatus}
                    </div>
                </div>

                <div className="panel">
                    <p className="muted" style={{ marginTop: 0 }}>Humidity</p>
                    <h2 style={{ margin: "0.25rem 0 0.5rem", color: valueColor(latest.humidityStatus) }}>
                        {latest.humidityAverage}%
                    </h2>
                    <div className={`status-pill ${statusClass(latest.humidityStatus)}`}>
                        {latest.humidityStatus}
                    </div>
                </div>

                <div className="panel">
                    <p className="muted" style={{ marginTop: 0 }}>Pressure</p>
                    <h2 style={{ margin: "0.25rem 0 0.5rem", color: valueColor(latest.pressureStatus) }}>
                        {latest.pressureAverage}
                    </h2>
                    <div className={`status-pill ${statusClass(latest.pressureStatus)}`}>
                        {latest.pressureStatus}
                    </div>
                </div>
            </section>

            <section className="panel stack">
                <div className="tabs">
                    <button className={`tab ${tab === "overview" ? "tab--active" : ""}`} onClick={() => setTab("overview")}>
                        Overview
                    </button>
                    <button className={`tab ${tab === "temp" ? "tab--active" : ""}`} onClick={() => setTab("temp")}>
                        Temperature
                    </button>
                    <button className={`tab ${tab === "wind" ? "tab--active" : ""}`} onClick={() => setTab("wind")}>
                        Wind
                    </button>
                    <button className={`tab ${tab === "humidity" ? "tab--active" : ""}`} onClick={() => setTab("humidity")}>
                        Humidity
                    </button>
                    <button className={`tab ${tab === "pressure" ? "tab--active" : ""}`} onClick={() => setTab("pressure")}>
                        Pressure
                    </button>
                </div>

                <div className="panel panel--soft" style={{ boxShadow: "none" }}>
                    {tab === "overview" && <WeatherChart data={history} multi />}
                    {tab === "temp" && renderChart("tempAverage", "#ff7300", "Temperature")}
                    {tab === "wind" && renderChart("windAverage", "#387908", "Wind")}
                    {tab === "humidity" && renderChart("humidityAverage", "#8884d8", "Humidity")}
                    {tab === "pressure" && renderChart("pressureAverage", "#82ca9d", "Pressure")}
                </div>
            </section>
        </div>
    );
}
