// models/SDG.js
const mongoose = require("mongoose");

const sdgSchema = new mongoose.Schema({
    number: { type: Number, required: true, unique: true }, // e.g., 1 to 17
    title: { type: String, required: true }, // e.g., "No Poverty"
    description: { type: String },
    iconUrl: { type: String } // optional: if you want to show icons on frontend
});

module.exports = mongoose.model("SDGS", sdgSchema);
