import { Link } from "react-router-dom";
import {
    ShieldCheck,
    Award,
    Wallet,
    QrCode
} from "lucide-react";

const Landing = () => {
    return (
        <div className="landing">

            <section className="hero">

                <div className="hero-content">

                    <div className="badge">
                          Secure Digital Student Identity
                    </div>

                    <h1>
                        Your Achievements.
                        <br />
                        <span>Your Digital Identity.</span>
                    </h1>

                    <p>
                        StudentWeb3 provides students with a secure
                        digital identity, verifiable credentials,
                        event participation and blockchain-powered
                        achievements.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="primary-button"
                        >
                            Get Started
                        </Link>

                        <Link
                            to="/verify"
                            className="secondary-button"
                        >
                            Verify Credential
                        </Link>

                    </div>

                </div>

            </section>

            <section className="features">

                <div className="feature-card">
                    <ShieldCheck size={35} />
                    <h3>Secure Identity</h3>
                    <p>
                        Create a trusted digital student identity.
                    </p>
                </div>

                <div className="feature-card">
                    <Award size={35} />
                    <h3>Verifiable Credentials</h3>
                    <p>
                        Store and verify student achievements.
                    </p>
                </div>

                <div className="feature-card">
                    <Wallet size={35} />
                    <h3>Blockchain Wallet</h3>
                    <p>
                        Connect your Web3 wallet to your identity.
                    </p>
                </div>

                <div className="feature-card">
                    <QrCode size={35} />
                    <h3>Event Participation</h3>
                    <p>
                        Attend events and receive digital badges.
                    </p>
                </div>

            </section>

        </div>
    );
};

export default Landing;
