require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./models/User");
const Credential = require("./models/Credential");

const createCredential = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        const student = await User.findOne({
            email: "23c54.shamitha@sjec.ac.in"
        });

        if (!student) {
            console.log("Student not found");
            process.exit();
        }

        const credential = await Credential.create({
            student: student._id,

            title: "Student Web3 Achievement",

            description:
                "Successfully completed the StudentWeb3 digital identity and blockchain credential program.",

            type: "achievement",

            issuer: student._id,

            blockchainCredentialId:
                "SW3-ACH-2026-001",

            transactionHash:
                "0xstudentweb3demo2026",

            verified: true
        });

        console.log("Credential created successfully!");
        console.log("Credential ID:", credential._id);

        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

createCredential();