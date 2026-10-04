const express = require("express");

const {
    getMyCredentials,
    verifyCredential,
    createCredential,
    getAllCredentials
} = require("../controllers/credentialController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/mine", protect, getMyCredentials);

router.get("/all", protect, getAllCredentials);

router.post("/create", protect, createCredential);

router.get("/verify/:id", verifyCredential);

module.exports = router;
