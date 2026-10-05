import { API_URL } from "../config";
import { useEffect, useState } from "react";

const Credentials = () => {
    const [credentials, setCredentials] = useState([]);
    const [rewards, setRewards] = useState({
        points: 0,
        level: "Beginner"
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "",
        type: "certificate",
        description: "",
        proofUrl: ""
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
                setRewards(data.rewards || {
                    points: 0,
                    level: "Beginner"
                });
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

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
                throw new Error(
                    data.message || "Unable to add credential"
                );
            }

            setMessage(
                `?? ${data.message} You now have ${data.rewards.totalPoints} points.`
            );

            setRewards({
                points: data.rewards.totalPoints,
                level: data.rewards.level
            });

            setForm({
                title: "",
                type: "certificate",
                description: "",
                proofUrl: ""
            });

            setShowForm(false);

            await loadCredentials();

        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const getIcon = (type) => {
        const icons = {
            certificate: "??",
            internship: "??",
            achievement: "??",
            "event-badge": "???",
            membership: "?",
            course: "??",
            project: "??",
            "student-id": "??"
        };

        return icons[type] || "??";
    };

    const getReward = (type) => {
        const rewards = {
            "student-id": 5,
            "event-badge": 10,
            certificate: 20,
            achievement: 30,
            membership: 10,
            internship: 50,
            course: 20,
            project: 40
        };

        return rewards[type] || 10;
    };

    return (
        <div style={styles.page}>

            <div style={styles.hero}>
                <div>
                    <p style={styles.label}>STUDENT WEB3</p>

                    <h1 style={styles.title}>
                        My Credentials
                    </h1>

                    <p style={styles.subtitle}>
                        Showcase your certificates, achievements and
                        experiences in one place.
                    </p>
                </div>

                <button
                    style={styles.addButton}
                    onClick={() => setShowForm(!showForm)}
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

            <div style={styles.rewardBox}>

                <div>
                    <p style={styles.rewardLabel}>
                        ACHIEVEMENT SCORE
                    </p>

                    <h2 style={styles.points}>
                        ?? {rewards.points}
                    </h2>

                    <p style={styles.level}>
                        {rewards.level}
                    </p>
                </div>

                <div style={styles.rewardText}>
                    <strong>Keep building your profile!</strong>
                    <p>
                        Add certificates, internships and achievements
                        to earn more reward points.
                    </p>
                </div>

            </div>

            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >
                    <h2>Add New Credential</h2>

                    <p style={styles.formSubtitle}>
                        Add an achievement or certificate to your profile.
                    </p>

                    <label>Credential Title</label>

                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Example: Full Stack Web Development Certificate"
                        required
                        style={styles.input}
                    />

                    <label>Credential Type</label>

                    <select
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        style={styles.input}
                    >
                        <option value="certificate">
                            Certificate (+20)
                        </option>

                        <option value="internship">
                            Internship (+50)
                        </option>

                        <option value="achievement">
                            Achievement (+30)
                        </option>

                        <option value="project">
                            Project (+40)
                        </option>

                        <option value="course">
                            Course (+20)
                        </option>

                        <option value="event-badge">
                            Event Badge (+10)
                        </option>

                        <option value="membership">
                            Membership (+10)
                        </option>
                    </select>

                    <label>Description</label>

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your achievement..."
                        rows="4"
                        style={styles.input}
                    />

                    <label>Proof / Certificate URL</label>

                    <input
                        name="proofUrl"
                        value={form.proofUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/..."
                        style={styles.input}
                    />

                    <div style={styles.rewardPreview}>
                        ?? You will earn{" "}
                        <strong>
                            +{getReward(form.type)} points
                        </strong>{" "}
                        after adding this credential.
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                        style={styles.submitButton}
                    >
                        {saving
                            ? "Adding..."
                            : "Add Credential"}
                    </button>

                </form>
            )}

            {loading ? (
                <p>Loading credentials...</p>
            ) : credentials.length === 0 ? (

                <div style={styles.empty}>

                    <div style={styles.emptyIcon}>
                        ??
                    </div>

                    <h2>No credentials yet</h2>

                    <p>
                        Add your first certificate or achievement
                        and start earning reward points.
                    </p>

                    <button
                        style={styles.emptyButton}
                        onClick={() => setShowForm(true)}
                    >
                        + Add Your First Credential
                    </button>

                </div>

            ) : (

                <div style={styles.grid}>

                    {credentials.map((credential) => (

                        <div
                            style={styles.card}
                            key={credential._id}
                        >

                            <div style={styles.cardTop}>

                                <div style={styles.icon}>
                                    {getIcon(credential.type)}
                                </div>

                                <span style={styles.pointsBadge}>
                                    +{credential.rewardPoints || 0} pts
                                </span>

                            </div>

                            <span style={styles.type}>
                                {credential.type
                                    ?.replace("-", " ")
                                    .toUpperCase()}
                            </span>

                            <h2 style={styles.cardTitle}>
                                {credential.title}
                            </h2>

                            <p style={styles.description}>
                                {credential.description ||
                                    "Achievement added to your profile."}
                            </p>

                            {credential.proofUrl && (
                                <a
                                    href={credential.proofUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={styles.proof}
                                >
                                    ?? View Proof
                                </a>
                            )}

                            <div style={styles.info}>
                                <span>Added</span>

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
        padding: "55px 8%",
        background: "#f7f8fc"
    },

    hero: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap"
    },

    label: {
        fontSize: "12px",
        letterSpacing: "3px",
        fontWeight: "700",
        color: "#6366f1"
    },

    title: {
        margin: "8px 0",
        fontSize: "38px"
    },

    subtitle: {
        color: "#666",
        margin: 0
    },

    addButton: {
        border: "none",
        background: "#4f46e5",
        color: "#fff",
        padding: "14px 22px",
        borderRadius: "12px",
        fontWeight: "700",
        cursor: "pointer",
        fontSize: "14px"
    },

    rewardBox: {
        background: "linear-gradient(135deg, #eef2ff, #f5f3ff)",
        border: "1px solid #ddd6fe",
        borderRadius: "20px",
        padding: "25px 30px",
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "30px",
        flexWrap: "wrap"
    },

    rewardLabel: {
        fontSize: "11px",
        letterSpacing: "2px",
        fontWeight: "700",
        color: "#6366f1",
        margin: 0
    },

    points: {
        fontSize: "32px",
        margin: "5px 0"
    },

    level: {
        margin: 0,
        fontWeight: "700",
        color: "#4f46e5"
    },

    rewardText: {
        maxWidth: "430px",
        color: "#555"
    },

    form: {
        background: "#fff",
        padding: "30px",
        borderRadius: "20px",
        marginBottom: "35px",
        boxShadow: "0 10px 30px rgba(0,0,0,.07)",
        border: "1px solid #eee",
        maxWidth: "750px"
    },

    formSubtitle: {
        color: "#777",
        marginTop: "-8px",
        marginBottom: "25px"
    },

    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "13px",
        marginTop: "7px",
        marginBottom: "18px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        fontSize: "14px",
        fontFamily: "inherit"
    },

    rewardPreview: {
        background: "#fefce8",
        padding: "13px",
        borderRadius: "10px",
        marginBottom: "18px",
        color: "#854d0e"
    },

    submitButton: {
        width: "100%",
        border: "none",
        background: "#111827",
        color: "#fff",
        padding: "14px",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer"
    },

    success: {
        background: "#ecfdf5",
        color: "#047857",
        padding: "15px 18px",
        borderRadius: "12px",
        marginBottom: "20px",
        fontWeight: "600"
    },

    error: {
        background: "#fef2f2",
        color: "#b91c1c",
        padding: "15px 18px",
        borderRadius: "12px",
        marginBottom: "20px",
        fontWeight: "600"
    },

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

    cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "18px"
    },

    icon: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "#eef2ff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "23px"
    },

    pointsBadge: {
        background: "#fef3c7",
        color: "#92400e",
        padding: "6px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "700"
    },

    type: {
        fontSize: "11px",
        letterSpacing: "1.5px",
        color: "#777",
        fontWeight: "700"
    },

    cardTitle: {
        marginBottom: "10px"
    },

    description: {
        color: "#666",
        lineHeight: "1.6"
    },

    proof: {
        display: "inline-block",
        marginTop: "5px",
        color: "#4f46e5",
        fontWeight: "700",
        textDecoration: "none"
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
        padding: "55px",
        borderRadius: "20px",
        textAlign: "center",
        border: "1px solid #eee"
    },

    emptyIcon: {
        fontSize: "45px",
        marginBottom: "10px"
    },

    emptyButton: {
        marginTop: "15px",
        border: "none",
        background: "#4f46e5",
        color: "#fff",
        padding: "13px 20px",
        borderRadius: "10px",
        fontWeight: "700",
        cursor: "pointer"
    }
};

export default Credentials;
