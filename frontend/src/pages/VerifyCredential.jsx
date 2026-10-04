import { useState } from "react";
import api from "../services/api";
import { ShieldCheck } from "lucide-react";

const VerifyCredential = () => {

    const [id, setId] = useState("");
    const [credential, setCredential] = useState(null);
    const [error, setError] = useState("");

    const verify = async (e) => {

        e.preventDefault();

        setCredential(null);
        setError("");

        try {

            const response = await api.get(
                `/credentials/verify/${id}`
            );

            setCredential(response.data);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Credential not found"
            );

        }
    };

    return (
        <div className="verify-page">

            <div className="verify-card">

                <ShieldCheck size={50} />

                <h1>
                    Verify Credential
                </h1>

                <p>
                    Enter a credential ID to verify
                    its authenticity.
                </p>

                <form onSubmit={verify}>

                    <input
                        placeholder="Credential ID"
                        value={id}
                        onChange={(e) =>
                            setId(e.target.value)
                        }
                        required
                    />

                    <button
                        className="primary-button"
                        type="submit"
                    >
                        Verify
                    </button>

                </form>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {credential && (
                    <div className="verification-result">

                        <h3>
                            {credential.verified
                                ? "? Verified"
                                : "? Pending Verification"}
                        </h3>

                        <p>
                            {credential.credential?.title}
                        </p>

                        <p>
                            {credential.credential?.description}
                        </p>

                    </div>
                )}

            </div>

        </div>
    );
};

export default VerifyCredential;
