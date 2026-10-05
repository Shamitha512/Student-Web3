const Credential = require("../models/Credential");
const User = require("../models/User");

const getMyCredentials = async (req, res) => {
    try {
        const credentials = await Credential.find({
            student: req.user.userId
        })
            .populate("issuer", "name email")
            .sort({ issuedAt: -1 });

        res.json({
            success: true,
            credentials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const verifyCredential = async (req, res) => {
    try {
        const credential = await Credential.findById(req.params.id)
            .populate("student", "name email studentId")
            .populate("issuer", "name email");

        if (!credential) {
            return res.status(404).json({
                success: false,
                message: "Credential not found"
            });
        }

        res.json({
            success: true,
            verified: credential.verified,
            credential
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/*
 * STUDENT: Submit their own credential
 */
const createCredential = async (req, res) => {
    try {
        const {
            title,
            description,
            type
        } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                success: false,
                message: "Credential title is required"
            });
        }

        const student = await User.findById(req.user.userId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        /*
         * Student-submitted credentials start as
         * pending verification.
         */
        const credential = await Credential.create({
            student: student._id,
            title: title.trim(),
            description: description || "",
            type: type || "achievement",
            issuer: null,
            blockchainCredentialId: `WEB3-${Date.now()}`,
            transactionHash: null,
            verified: false
        });

        res.status(201).json({
            success: true,
            message: "Credential submitted successfully. Waiting for verification.",
            credential,
            reward: {
                points: 10,
                message: "You earned 10 points for submitting a credential!"
            }
        });

    } catch (error) {
        console.error("Create credential error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

/*
 * ADMIN: Get all credentials
 */
const getAllCredentials = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        const credentials = await Credential.find()
            .populate("student", "name email studentId")
            .populate("issuer", "name email")
            .sort({ issuedAt: -1 });

        res.json({
            success: true,
            credentials
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getMyCredentials,
    verifyCredential,
    createCredential,
    getAllCredentials
};
