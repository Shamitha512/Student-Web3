const Credential = require("../models/Credential");
const User = require("../models/User");

const getMyCredentials = async (req, res) => {
    try {
        const credentials = await Credential.find({
            student: req.user.userId
        })
            .populate("issuer", "name email")
            .sort({ issuedAt: -1 });

        const user = await User.findById(req.user.userId).select(
            "name email studentId rewardPoints achievementLevel"
        );

        res.json({
            success: true,
            credentials,
            rewards: {
                points: user?.rewardPoints || 0,
                level: user?.achievementLevel || "Beginner"
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const calculateReward = (type) => {
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


const calculateLevel = (points) => {
    if (points >= 200) return "Elite";
    if (points >= 120) return "Star";
    if (points >= 60) return "Achiever";
    if (points >= 20) return "Explorer";
    return "Beginner";
};


const createCredential = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            proofUrl
        } = req.body;

        if (!title || !type) {
            return res.status(400).json({
                success: false,
                message: "Title and credential type are required"
            });
        }

        const student = await User.findById(req.user.userId);

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        const rewardPoints = calculateReward(type);

        const credential = await Credential.create({
            student: student._id,
            title,
            description: description || "",
            type,
            proofUrl: proofUrl || "",
            issuer: null,
            rewardPoints,
            verified: false
        });

        student.rewardPoints =
            (student.rewardPoints || 0) + rewardPoints;

        student.achievementLevel =
            calculateLevel(student.rewardPoints);

        await student.save();

        res.status(201).json({
            success: true,
            message: `Credential added successfully! You earned ${rewardPoints} reward points.`,
            credential,
            rewards: {
                pointsEarned: rewardPoints,
                totalPoints: student.rewardPoints,
                level: student.achievementLevel
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
