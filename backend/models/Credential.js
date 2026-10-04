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
            required: true
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
                "membership"
            ],
            default: "achievement"
        },

        issuer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        blockchainCredentialId: {
            type: String,
            default: null
        },

        transactionHash: {
            type: String,
            default: null
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
