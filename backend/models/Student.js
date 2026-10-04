const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        studentId: {
            type: String,
            required: true,
            unique: true
        },

        department: {
            type: String,
            default: "Computer Science and Engineering"
        },

        college: {
            type: String,
            default: "St. Joseph Engineering College"
        },

        year: {
            type: String,
            default: "4th Year"
        },

        walletAddress: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Student", studentSchema);
