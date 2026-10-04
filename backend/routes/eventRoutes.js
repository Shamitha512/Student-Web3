const express = require("express");

const {
    createEvent,
    getEvents,
    markAttendance
} = require("../controllers/eventController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("admin"),
    createEvent
);

router.get("/", protect, getEvents);

router.post(
    "/attendance",
    protect,
    authorize("student"),
    markAttendance
);

module.exports = router;
