import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className="app-shell">
            <Sidebar />

            <main className="main-shell">
                {children}
            </main>
        </div>
    );
}
