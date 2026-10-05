const mongoose = require("mongoose");

const credentialSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        type: {
            type: String,
            enum: [
                "student-id",
                "event-badge",
                "certificate",
                "achievement",
                "membership",
                "internship",
                "course",
                "project"
            ],
            default: "achievement"
        },

        proofUrl: {
            type: String,
            default: ""
        },

        issuer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        rewardPoints: {
            type: Number,
            default: 0
        },

        verified: {
            type: Boolean,
            default: false
        },

        issuedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Credential", credentialSchema);
