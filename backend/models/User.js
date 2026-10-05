const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            enum: ["student", "admin", "employer"],
            default: "student"
        },

        walletAddress: {
            type: String,
            default: null
        },

        studentId: {
            type: String,
            default: null
        },

        rewardPoints: {
            type: Number,
            default: 0
        },

        achievementLevel: {
            type: String,
            enum: ["Beginner", "Explorer", "Achiever", "Star", "Elite"],
            default: "Beginner"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);
