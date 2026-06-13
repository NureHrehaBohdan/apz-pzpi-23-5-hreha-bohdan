import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="page">
            <header className="page__header">
                <div>
                    <h1 className="page__title">Dashboard</h1>
                    <p className="page__subtitle">
                        Central view for system sections.
                    </p>
                </div>
            </header>

            <section className="grid-3">
                <div className="panel">
                    <h2 className="section-title">Sensors</h2>
                    <p className="muted">
                        Add and maintain sensor entries with location and elevation.
                    </p>
                    <Link className="btn-ghost" to="/sensors">Open sensors</Link>
                </div>

                <div className="panel">
                    <h2 className="section-title">Weather</h2>
                    <p className="muted">
                        Review current weather status and the recent history charts.
                    </p>
                    <Link className="btn-ghost" to="/weather">Open weather</Link>
                </div>

                <div className="panel">
                    <h2 className="section-title">Reports</h2>
                    <p className="muted">
                        Inspect today&apos;s reports either as a table or on the map.
                    </p>
                    <Link className="btn-ghost" to="/reports">Open reports</Link>
                </div>
            </section>
        </div>
    );
}
