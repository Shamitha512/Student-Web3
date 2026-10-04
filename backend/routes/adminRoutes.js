const express = require("express");

const {
    getUsers,
    getCredentials
} = require("../controllers/adminController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/users", protect, authorize("admin"), getUsers);

router.get("/credentials", protect, authorize("admin"), getCredentials);

module.exports = router;
