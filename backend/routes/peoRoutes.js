const express = require("express");
const router = express.Router();
const PEO = require("../models/peo");
const { verifyAdmin } = require("../middlewares/authMiddleware");

// Create PEO
router.post("/", verifyAdmin, async (req, res) => {
    try {
        const newPEO = new PEO(req.body);
        await newPEO.save();
        res.status(201).json(newPEO);
    } catch (error) {
        res.status(500).json({ message: "Error creating PEO", error });
    }
});

// Get all PEOs
router.get("/", async (req, res) => {
    try {
        const peos = await PEO.find();
        res.status(200).json(peos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching PEOs", error });
    }
});

// Delete PEO
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await PEO.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "PEO deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting PEO", error });
    }
});

module.exports = router;
