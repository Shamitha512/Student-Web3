const Event = require("../models/Event");
const Attendance = require("../models/Attendance");
const Credential = require("../models/Credential");

const createEvent = async (req, res) => {
    try {
        const { name, description, date, reward } = req.body;

        if (!name || !date) {
            return res.status(400).json({
                success: false,
                message: "Event name and date are required"
            });
        }

        const event = await Event.create({
            name,
            description,
            date,
            reward: reward || 0,
            createdBy: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Event created successfully",
            event
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .sort({ date: 1 });

        res.json({
            success: true,
            events
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const markAttendance = async (req, res) => {
    try {
        const { eventId, walletAddress } = req.body;

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        const existing = await Attendance.findOne({
            event: eventId,
            student: req.user.userId
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "Attendance already recorded"
            });
        }

        const attendance = await Attendance.create({
            event: eventId,
            student: req.user.userId,
            walletAddress
        });

        const credential = await Credential.create({
            student: req.user.userId,
            title: event.name,
            description: `Participation in ${event.name}`,
            type: "event-badge",
            issuer: event.createdBy,
            verified: false
        });

        res.status(201).json({
            success: true,
            message: "Attendance recorded successfully",
            attendance,
            credential,
            reward: event.reward
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createEvent,
    getEvents,
    markAttendance
};
