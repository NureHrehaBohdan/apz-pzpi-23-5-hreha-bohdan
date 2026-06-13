import { useState } from "react";
import { login } from "../api/auth";
import { setToken } from "../utils/token";
import hero from "../assets/hero.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Fill all fields");
            return;
        }

        try {
            const res = await login({ email, password });
            setToken(res.data.data.jwt);
            window.location.href = "/";
        } catch (e) {
            console.log("Login error", e);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <section className="auth-hero">
                    <img src={hero} alt="" aria-hidden="true" />
                    <div>
                        <h1 className="page__title" style={{ marginBottom: 0 }}>Admin Panel</h1>
                        <p className="page__subtitle">
                            Sign in to manage sensors, routes, weather, reports and backups.
                        </p>
                    </div>
                </section>

                <section className="auth-panel">
                    <div>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>Login</h2>
                        <p className="muted" style={{ marginTop: "0.35rem" }}>
                            Use your admin credentials.
                        </p>
                    </div>

                    <div className="auth-form">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <div className="auth-actions">
                            <button onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
