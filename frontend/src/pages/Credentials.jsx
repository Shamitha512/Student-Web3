import { API_URL } from "../config";
import { useEffect, useState } from "react";

const Credentials = () => {
    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(
                    "${API_URL}/api/credentials/mine",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setCredentials(data.credentials || []);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadCredentials();
    }, []);

    return (
        <div style={styles.page}>
            <div style={styles.hero}>
                <p style={styles.label}>STUDENT WEB3</p>
                <h1>My Credentials</h1>
                <p>Verified digital achievements stored on your profile.</p>
            </div>

            {loading ? (
                <p>Loading credentials...</p>
            ) : credentials.length === 0 ? (
                <div style={styles.empty}>
                    <h2>No credentials yet</h2>
                    <p>Your certificates and achievements will appear here.</p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {credentials.map((credential) => (
                        <div style={styles.card} key={credential._id}>
                            <div style={styles.icon}>?</div>

                            <span style={styles.type}>
                                {credential.type?.replace("-", " ").toUpperCase()}
                            </span>

                            <h2>{credential.title}</h2>

                            <p>{credential.description || "Verified achievement"}</p>

                            <div style={styles.info}>
                                <span>Issued</span>
                                <strong>
                                    {new Date(
                                        credential.issuedAt
                                    ).toLocaleDateString()}
                                </strong>
                            </div>

                            <div
                                style={{
                                    ...styles.status,
                                    color: credential.verified
                                        ? "#16a34a"
                                        : "#d97706"
                                }}
                            >
                                {credential.verified
                                    ? "? Verified"
                                    : "? Pending Verification"}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    page: {
        minHeight: "calc(100vh - 70px)",
        padding: "60px 8%",
        background: "#f7f8fc"
    },
    hero: {
        marginBottom: "40px"
    },
    label: {
        fontSize: "12px",
        letterSpacing: "3px",
        fontWeight: "700",
        color: "#6366f1"
    },
    heroTitle: {},
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px"
    },
    card: {
        background: "#fff",
        padding: "28px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,.07)",
        border: "1px solid #eee"
    },
    icon: {
        width: "45px",
        height: "45px",
        borderRadius: "50%",
        background: "#eef2ff",
        color: "#4f46e5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
        fontWeight: "700",
        marginBottom: "20px"
    },
    type: {
        fontSize: "11px",
        letterSpacing: "1.5px",
        color: "#777",
        fontWeight: "700"
    },
    info: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
        paddingTop: "15px",
        borderTop: "1px solid #eee",
        fontSize: "13px"
    },
    status: {
        marginTop: "18px",
        fontWeight: "700"
    },
    empty: {
        background: "#fff",
        padding: "50px",
        borderRadius: "20px",
        textAlign: "center"
    }
};

export default Credentials;


