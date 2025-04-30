const express = require("express");
const router = express.Router();
const PO = require("../models/po");
const { verifyAdmin } = require("../middlewares/authMiddleware");

// Create PO
router.post("/", verifyAdmin, async (req, res) => {
    try {
        const newPO = new PO(req.body);
        await newPO.save();
        res.status(201).json(newPO);
    } catch (error) {
        res.status(500).json({ message: "Error creating PO", error });
    }
});

// Get all POs
router.get("/", async (req, res) => {
    try {
        const pos = await PO.find();
        res.status(200).json(pos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching POs", error });
    }
});

// Delete PO
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await PO.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "PO deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting PO", error });
    }
});

module.exports = router;
