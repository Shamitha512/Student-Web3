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

const createCredential = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        const {
            studentId,
            title,
            description,
            type
        } = req.body;

        if (!studentId || !title) {
            return res.status(400).json({
                success: false,
                message: "Student ID and title are required"
            });
        }

        const student = await User.findOne({
            studentId,
            role: "student"
        });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const credential = await Credential.create({
            student: student._id,
            title,
            description: description || "",
            type: type || "achievement",
            issuer: req.user.userId,
            blockchainCredentialId: `WEB3-${Date.now()}`,
            verified: true
        });

        res.status(201).json({
            success: true,
            message: "Credential issued successfully",
            credential
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

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
