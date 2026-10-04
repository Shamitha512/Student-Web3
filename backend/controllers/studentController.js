const User = require("../models/User");
const Student = require("../models/Student");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const student = await Student.findOne({
            user: user._id
        });

        res.json({
            success: true,
            user,
            student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateWallet = async (req, res) => {
    try {
        const { walletAddress } = req.body;

        if (!walletAddress) {
            return res.status(400).json({
                success: false,
                message: "Wallet address is required"
            });
        }

        const user = await User.findByIdAndUpdate(
            req.user.userId,
            { walletAddress },
            { new: true }
        ).select("-password");

        res.json({
            success: true,
            message: "Wallet connected successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateWallet
};
