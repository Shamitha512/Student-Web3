import { API_URL } from "../config";
import { useEffect, useState } from "react";

const StudentDashboard = () => {
    const [profile, setProfile] = useState(null);
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        Promise.all([
            fetch("${API_URL}/api/students/profile", {
                headers: { Authorization: `Bearer ${token}` }
            }).then((r) => r.json()),

            fetch("${API_URL}/api/credentials/mine", {
                headers: { Authorization: `Bearer ${token}` }
            }).then((r) => r.json())
        ]).then(([profileData, credentialData]) => {
            setProfile(profileData);
            setCredentials(credentialData.credentials || []);
        });
    }, []);

    const user = profile?.user;
    const student = profile?.student;

    return (
        <div style={{ padding: "50px 8%" }}>
            <h1>Welcome, {user?.name || "Student"} ??</h1>
            <p>Your Student Web3 dashboard</p>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                gap: "20px",
                marginTop: "35px"
            }}>
                <Card title="Student ID" value={student?.studentId || user?.studentId || "N/A"} />
                <Card title="Department" value={student?.department || "CSE"} />
                <Card title="Year" value={student?.year || "4th Year"} />
                <Card title="Credentials" value={credentials.length} />
            </div>
        </div>
    );
};

const Card = ({ title, value }) => (
    <div style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 8px 25px rgba(0,0,0,.07)"
    }}>
        <p style={{ color: "#777" }}>{title}</p>
        <h2>{value}</h2>
    </div>
);

export default StudentDashboard;


