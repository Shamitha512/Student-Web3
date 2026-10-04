import { useAuth } from "../context/AuthContext";

const EmployerDashboard = () => {
    const { user } = useAuth();

    return (
        <div style={{ padding: "60px 8%" }}>
            <p style={{ color: "#6366f1", fontWeight: "700" }}>EMPLOYER PORTAL</p>
            <h1>Employer Dashboard</h1>
            <p>Welcome, {user?.name || "Employer"}.</p>

            <div style={{
                marginTop: "35px",
                padding: "30px",
                background: "#fff",
                borderRadius: "20px",
                boxShadow: "0 8px 25px rgba(0,0,0,.07)"
            }}>
                <h2>Credential Verification</h2>
                <p>
                    Use the Verify page to verify student credentials
                    before hiring.
                </p>
            </div>
        </div>
    );
};

export default EmployerDashboard;
