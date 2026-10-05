import { API_URL } from "../config";
import { useEffect, useState } from "react";

const Credentials = () => {
    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        description: "",
        type: "certificate"
    });

    const loadCredentials = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/credentials/mine`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setCredentials(data.credentials || []);
            } else {
                setError(data.message || "Unable to load credentials");
            }
        } catch (err) {
            console.error(err);
            setError("Unable to connect to server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCredentials();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!form.title.trim()) {
            setError("Please enter a credential title.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/api/credentials/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to add credential");
                return;
            }

            setMessage(
                `${data.message} ?? +${data.reward?.points || 10} reward points`
            );

            setForm({
                title: "",
                description: "",
                type: "certificate"
            });

            setShowForm(false);

            await loadCredentials();

        } catch (err) {
            console.error(err);
            setError("Unable to connect to server");
        }
    };

    return (
        <div style={styles.page}>

            <div style={styles.hero}>
                <div>
                    <p style={styles.label}>STUDENT WEB3</p>
                    <h1>My Credentials</h1>
                    <p>
                        Verified digital achievements stored on your profile.
                    </p>
                </div>

                <button
                    style={styles.addButton}
                    onClick={() => {
                        setShowForm(!showForm);
                        setError("");
                        setMessage("");
                    }}
                >
                    {showForm ? "? Close" : "+ Add Credential"}
                </button>
            </div>

            {message && (
                <div style={styles.success}>
                    {message}
                </div>
            )}

            {error && (
                <div style={styles.error}>
                    {error}
                </div>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} style={styles.form}>

                    <h2>Add Credential</h2>

                    <label>Credential Title</label>

                    <input
                        type="text"
                        placeholder="Example: Full Stack Web Development Certificate"
                        value={form.title}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                title: e.target.value
                            })
                        }
                    />

                    <label>Description</label>

                    <textarea
                        placeholder="Describe your achievement..."
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value
                            })
                        }
                    />

                    <label>Credential Type</label>

                    <select
                        value={form.type}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                type: e.target.value
                            })
                        }
                    >
                        <option value="certificate">Certificate</option>
                        <option value="achievement">Achievement</option>
                        <option value="event-badge">Event Badge</option>
                        <option value="membership">Membership</option>
                        <option value="student-id">Student ID</option>
                    </select>

                    <button
                        type="submit"
                        style={styles.submitButton}
                    >
                        Submit Credential ??
                    </button>

                    <p style={styles.note}>
                        Your credential will be submitted for verification.
                    </p>

                </form>
            )}

            {loading ? (
                <p>Loading credentials...</p>
            ) : credentials.length === 0 ? (
                <div style={styles.empty}>
                    <h2>No credentials yet</h2>
                    <p>
                        Add your first certificate or achievement above.
                    </p>
                </div>
            ) : (
                <div style={styles.grid}>
                    {credentials.map((credential) => (
                        <div
                            style={styles.card}
                            key={credential._id}
                        >
                            <div style={styles.icon}>
                                ??
                            </div>

                            <span style={styles.type}>
                                {credential.type
                                    ?.replace("-", " ")
                                    .toUpperCase()}
                            </span>

                            <h2>{credential.title}</h2>

                            <p>
                                {credential.description ||
                                    "Digital achievement"}
                            </p>

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
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "35px",
        gap: "20px"
    },

    label: {
        fontSize: "12px",
        letterSpacing: "3px",
        fontWeight: "700",
        color: "#6366f1"
    },

    addButton: {
        border: "none",
        background: "#4f46e5",
        color: "#fff",
        padding: "13px 22px",
        borderRadius: "12px",
        fontWeight: "700",
        cursor: "pointer"
    },

    form: {
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginBottom: "35px",
        boxShadow: "0 10px 30px rgba(0,0,0,.07)",
        maxWidth: "650px"
    },

    input: {},

    success: {
        background: "#dcfce7",
        color: "#166534",
        padding: "15px 20px",
        borderRadius: "12px",
        marginBottom: "20px",
        fontWeight: "600"
    },

    error: {
        background: "#fee2e2",
        color: "#991b1b",
        padding: "15px 20px",
        borderRadius: "12px",
        marginBottom: "20px",
        fontWeight: "600"
    },

    submitButton: {
        width: "100%",
        marginTop: "20px",
        border: "none",
        background: "#111827",
        color: "#fff",
        padding: "14px",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer"
    },

    note: {
        fontSize: "13px",
        color: "#777",
        marginTop: "12px"
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(280px, 1fr))",
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px",
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
