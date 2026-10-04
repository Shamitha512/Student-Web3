import { API_URL } from "../config";
import "./Profile.css";
import { useEffect, useState } from "react";
import {
    User,
    Mail,
    GraduationCap,
    Building2,
    Calendar,
    Wallet
} from "lucide-react";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Please login first");
                }

                const response = await fetch(
                    "${API_URL}/api/students/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to load profile"
                    );
                }

                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-loading">
                    <h2>Loading profile...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <div className="profile-error">
                    <h2>Unable to load profile</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    const user = profile?.user;
    const student = profile?.student;

    return (
        <div className="profile-page">

            <div className="profile-container">

                {/* HEADER */}
                <div className="profile-header">

                    <div className="profile-avatar">
                        <User size={42} />
                    </div>

                    <div>
                        <p className="eyebrow">STUDENT PROFILE</p>

                        <h1>{user?.name}</h1>

                        <p className="profile-role">
                            {user?.role?.toUpperCase()}
                        </p>
                    </div>

                </div>

                {/* INFORMATION */}
                <div className="profile-card">

                    <h2>Personal Information</h2>

                    <div className="profile-grid">

                        <div className="profile-item">
                            <Mail size={20} />
                            <div>
                                <span className="profile-label">
                                    Email
                                </span>

                                <span className="profile-value">
                                    {user?.email}
                                </span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <GraduationCap size={20} />
                            <div>
                                <span className="profile-label">
                                    Student ID
                                </span>

                                <span className="profile-value">
                                    {student?.studentId ||
                                        user?.studentId ||
                                        "Not assigned"}
                                </span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <Building2 size={20} />
                            <div>
                                <span className="profile-label">
                                    Department
                                </span>

                                <span className="profile-value">
                                    {student?.department ||
                                        "Computer Science and Engineering"}
                                </span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <Building2 size={20} />
                            <div>
                                <span className="profile-label">
                                    College
                                </span>

                                <span className="profile-value">
                                    {student?.college ||
                                        "St. Joseph Engineering College"}
                                </span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <Calendar size={20} />
                            <div>
                                <span className="profile-label">
                                    Year
                                </span>

                                <span className="profile-value">
                                    {student?.year || "4th Year"}
                                </span>
                            </div>
                        </div>

                        <div className="profile-item">
                            <Wallet size={20} />
                            <div>
                                <span className="profile-label">
                                    Wallet
                                </span>

                                <span
                                    className={`profile-value ${
                                        user?.walletAddress
                                            ? "wallet-connected"
                                            : "wallet-not-connected"
                                    }`}
                                >
                                    {user?.walletAddress ||
                                        "Not Connected"}
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

                {/* DIGITAL ID */}
                <div className="digital-profile-card">

                    <div className="digital-id-content">

                        <span className="digital-label">
                            DIGITAL STUDENT ID
                        </span>

                        <h2>{user?.name}</h2>

                        <p>
                            {student?.studentId ||
                                user?.studentId}
                        </p>

                        <p>
                            {student?.department ||
                                "Computer Science and Engineering"}
                        </p>

                    </div>

                    <div className="verified-badge">
                        ✓ Verified Student
                    </div>

                </div>

            </div>

        </div>
    );
};

export default Profile;
