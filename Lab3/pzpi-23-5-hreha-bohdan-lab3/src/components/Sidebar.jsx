import { NavLink } from "react-router-dom";
import hero from "../assets/hero.png";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar__brand">
                <img src={hero} alt="" aria-hidden="true" />
                <div>
                    <h1>Admin Panel</h1>
                    <p>Operations dashboard</p>
                </div>
            </div>

            <nav className="sidebar__nav">
                <NavLink to="/sensors" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
                    Sensors
                </NavLink>
                <NavLink to="/routes" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
                    Routes
                </NavLink>
                <NavLink to="/weather" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
                    Weather
                </NavLink>
                <NavLink to="/analytics" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
                    Analytics
                </NavLink>
                <NavLink to="/backups" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
                    Backups
                </NavLink>
                <NavLink to="/reports" className={({ isActive }) => `sidebar__link ${isActive ? "sidebar__link--active" : ""}`}>
                    Reports
                </NavLink>
            </nav>
        </aside>
    );
}
