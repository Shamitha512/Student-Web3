const User = require("../models/User");
const Credential = require("../models/Credential");

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCredentials = async (req, res) => {
    try {
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
    getUsers,
    getCredentials
};
