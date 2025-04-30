// routes/sdgRoutes.js
const express = require("express");
const router = express.Router();
const SDG = require("../models/SDGS");
const { verifyAdmin } = require("../middlewares/authMiddleware");

// Create SDG
router.post("/", verifyAdmin, async (req, res) => {
    try {
        const sdg = new SDG(req.body);
        await sdg.save();
        res.status(201).json(sdg);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all SDGs (public)
router.get("/", async (req, res) => {
    try {
        const sdgs = await SDG.find().sort("number");
        res.json(sdgs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update SDG
router.put("/:id", verifyAdmin, async (req, res) => {
    try {
        const updated = await SDG.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete SDG
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        await SDG.findByIdAndDelete(req.params.id);
        res.json({ message: "SDG deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
