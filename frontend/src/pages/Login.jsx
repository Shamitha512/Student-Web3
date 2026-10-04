import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            login(response.data);

            navigate("/dashboard");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );

        }
    };

    return (
        <div className="auth-page">

            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >

                <h2>Welcome Back</h2>

                <p className="auth-subtitle">
                    Login to your StudentWeb3 account
                </p>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <button
                    type="submit"
                    className="primary-button full-width"
                >
                    Login
                </button>

                <p className="auth-footer">
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </form>

        </div>
    );
};

export default Login;
