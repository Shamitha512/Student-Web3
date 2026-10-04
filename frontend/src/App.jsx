import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import VerifyCredential from "./pages/VerifyCredential";
import Profile from "./pages/Profile";
import Credentials from "./pages/Credentials";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import EmployerDashboard from "./pages/EmployerDashboard";

import { AuthProvider } from "./context/AuthContext";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar />

                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/student" element={<StudentDashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/employer" element={<EmployerDashboard />} />

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/credentials" element={<Credentials />} />
                    <Route path="/verify" element={<VerifyCredential />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
