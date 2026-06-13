import { useEffect, useState } from "react";
import {
    getRouteActivity,
    getLoadForecast,
    getHourlyActivity
} from "../api/analytics";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    LineChart,
    Line,
    ResponsiveContainer
} from "recharts";

export default function Analytics() {
    const [routeActivity, setRouteActivity] = useState([]);
    const [hourly, setHourly] = useState([]);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [r, f, h] = await Promise.all([
                    getRouteActivity(),
                    getLoadForecast(),
                    getHourlyActivity()
                ]);

                setRouteActivity(r.data.data || []);
                setHourly(h.data.data || []);
                setForecast(f.data.data);
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

    const transformed = routeActivity.map((r) => ({
        ...r,
        avgSessionsPerDay: Math.max(1, r.avgSessionsPerDay)
    }));

    if (loading) {
        return (
            <div className="page">
                <div className="panel">Loading analytics...</div>
            </div>
        );
    }

    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Analytics Dashboard</h1>
                    <p className="page__subtitle">
                        Compact overview of route activity, traffic and forecast data.
                    </p>
                </div>
            </header>

            {forecast && (
                <section className="grid-4">
                    <div className="panel">
                        <p className="muted" style={{ marginTop: 0 }}>Current Load</p>
                        <h2 style={{ margin: 0 }}>{forecast.currentLoad}</h2>
                    </div>

                    <div className="panel">
                        <p className="muted" style={{ marginTop: 0 }}>EWMA</p>
                        <h2 style={{ margin: 0 }}>{forecast.ewmaForecast.toFixed(2)}</h2>
                    </div>

                    <div className="panel">
                        <p className="muted" style={{ marginTop: 0 }}>Adjusted</p>
                        <h2 style={{ margin: 0 }}>{forecast.weatherAdjustedForecast.toFixed(2)}</h2>
                    </div>

                    <div className="panel">
                        <p className="muted" style={{ marginTop: 0 }}>Trend</p>
                        <h2 style={{ margin: 0 }}>{forecast.trend.toFixed(2)}</h2>
                    </div>
                </section>
            )}

            <section className="panel stack">
                <h2 className="section-title">Route Activity</h2>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={transformed}>
                            <XAxis dataKey="routeName" />
                            <YAxis domain={[1, "auto"]} />
                            <Tooltip />
                            <Bar dataKey="avgSessionsPerDay" fill="#2f6fed" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </section>

            <section className="panel stack">
                <h2 className="section-title">Hourly Activity</h2>
                <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hourly}>
                            <XAxis dataKey="hour" interval={1} />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="sessions" stroke="#1f9d67" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </section>
        </div>
    );
}
