import { API_URL } from "../config";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [credentials, setCredentials] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        Promise.all([
            fetch("${API_URL}/api/admin/users", {
                headers: { Authorization: `Bearer ${token}` }
            }).then((r) => r.json()),

            fetch("${API_URL}/api/admin/credentials", {
                headers: { Authorization: `Bearer ${token}` }
            }).then((r) => r.json())
        ]).then(([usersData, credentialsData]) => {
            setUsers(usersData.users || []);
            setCredentials(credentialsData.credentials || []);
        });
    }, []);

    return (
        <div style={{ padding: "50px 8%", background: "#f7f8fc", minHeight: "90vh" }}>
            <p style={{ color: "#6366f1", fontWeight: "700" }}>ADMIN PANEL</p>
            <h1>Student Web3 Administration</h1>

            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
                margin: "30px 0"
            }}>
                <Stat title="Total Users" value={users.length} />
                <Stat title="Students" value={users.filter(u => u.role === "student").length} />
                <Stat title="Credentials" value={credentials.length} />
            </div>

            <div style={{
                background: "#fff",
                padding: "25px",
                borderRadius: "18px"
            }}>
                <h2>Registered Users</h2>

                {users.map((u) => (
                    <div
                        key={u._id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "15px 0",
                            borderBottom: "1px solid #eee"
                        }}
                    >
                        <span>{u.name}</span>
                        <span>{u.email}</span>
                        <strong>{u.role}</strong>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Stat = ({ title, value }) => (
    <div style={{
        background: "#fff",
        padding: "25px",
        borderRadius: "18px",
        boxShadow: "0 8px 25px rgba(0,0,0,.06)"
    }}>
        <p>{title}</p>
        <h2>{value}</h2>
    </div>
);

export default AdminDashboard;


