import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Student<span>Web3</span>
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>

                {user && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">Profile</Link>
                        <Link to="/credentials">Credentials</Link>
                    </>
                )}

                <Link to="/verify">Verify</Link>

                {!user ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="nav-button">
                            Register
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
