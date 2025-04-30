const mongoose = require("mongoose");

const PEOSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // e.g., PEO1
    description: { type: String, required: true },
});

module.exports = mongoose.model("PEO", PEOSchema);
