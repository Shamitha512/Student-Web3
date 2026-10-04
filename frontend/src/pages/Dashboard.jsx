import {
    User,
    Award,
    CalendarCheck,
    Wallet,
    ShieldCheck,
    GraduationCap
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="auth-page">
                <h2>Please login first.</h2>
            </div>
        );
    }

    return (
        <div className="dashboard">

            {/* HEADER */}

            <div className="dashboard-header">

                <div>

                    <p className="eyebrow">
                        STUDENTWEB3 DASHBOARD
                    </p>

                    <h1>
                        Welcome, {user.name} 👋
                    </h1>

                    <p>
                        Your digital student identity at a glance.
                    </p>

                </div>

                <div className="role-badge">
                    {user.role}
                </div>

            </div>


            {/* DIGITAL ID CARD */}

            <div className="digital-id">

                <div className="id-icon">
                    <GraduationCap size={40} />
                </div>

                <div className="id-info">

                    <span>
                        DIGITAL STUDENT ID
                    </span>

                    <h2>
                        {user.name}
                    </h2>

                    <p>
                        Student ID:{" "}
                        <strong>
                            {user.studentId || "Not assigned"}
                        </strong>
                    </p>

                    <p>
                        {user.email}
                    </p>

                </div>

                <div className="verified">

                    <ShieldCheck size={22} />

                    Verified

                </div>

            </div>


            {/* STAT CARDS */}

            <div className="stats-grid">

                <div className="stat-card">

                    <Award />

                    <span>
                        Credentials
                    </span>

                    <strong>
                        0
                    </strong>

                </div>


                <div className="stat-card">

                    <CalendarCheck />

                    <span>
                        Events
                    </span>

                    <strong>
                        0
                    </strong>

                </div>


                <div className="stat-card">

                    <Award />

                    <span>
                        Achievement Points
                    </span>

                    <strong>
                        {user.points || 0}
                    </strong>

                </div>


                <div className="stat-card">

                    <Wallet />

                    <span>
                        Wallet
                    </span>

                    <strong>
                        {user.walletAddress
                            ? "Connected"
                            : "Not Connected"}
                    </strong>

                </div>

            </div>


            {/* ACTIONS */}

            <h2 className="section-title">
                Quick Actions
            </h2>


            <div className="dashboard-actions">

                <div className="action-card">

                    <User />

                    <h3>
                        My Profile
                    </h3>

                    <p>
                        Manage your student information
                        and digital identity.
                    </p>

                </div>


                <div className="action-card">

                    <Award />

                    <h3>
                        My Credentials
                    </h3>

                    <p>
                        View certificates, badges
                        and achievements.
                    </p>

                </div>


                <div className="action-card">

                    <CalendarCheck />

                    <h3>
                        Events
                    </h3>

                    <p>
                        Participate in Web3 events
                        and earn badges.
                    </p>

                </div>


                <div className="action-card">

                    <ShieldCheck />

                    <h3>
                        Verify Credential
                    </h3>

                    <p>
                        Verify a student's digital
                        credential.
                    </p>

                </div>


                <div className="action-card">

                    <Wallet />

                    <h3>
                        Connect Wallet
                    </h3>

                    <p>
                        Connect your Web3 wallet
                        to your student identity.
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Dashboard;