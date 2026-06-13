import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sensors from "../pages/Sensors";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";
import Weather from "../pages/Weather";
import Backups from "../pages/Backups";
import Analytics from "../pages/Analytics";
import Reports from "../pages/Reports";
import RoutesPage from "../pages/Routes";

export default function AppRouter() {
    return (<BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>

                <Route
                    path="/"
                    element={<ProtectedRoute>
                        <Layout>
                            <Dashboard/>
                        </Layout>
                    </ProtectedRoute>}
                />

                <Route
                    path="/routes"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <RoutesPage />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sensors"
                    element={<ProtectedRoute>
                        <Layout>
                            <Sensors/>
                        </Layout>
                    </ProtectedRoute>}
                />

                <Route
                    path="/weather"
                    element={<ProtectedRoute>
                        <Layout>
                            <Weather/>
                        </Layout>
                    </ProtectedRoute>}
                />

                <Route
                    path="/backups"
                    element={<ProtectedRoute>
                        <Layout>
                            <Backups/>
                        </Layout>
                    </ProtectedRoute>}
                />

                <Route
                    path="/analytics"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Analytics />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/reports"
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <Reports />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </BrowserRouter>);
}