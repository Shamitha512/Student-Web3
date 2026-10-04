const express = require("express");

const {
    getProfile,
    updateWallet
} = require("../controllers/studentController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/wallet", protect, updateWallet);

module.exports = router;
