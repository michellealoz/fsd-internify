const mongoose = require("mongoose");

const POSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, // e.g., PO1
    description: { type: String, required: true },
});

module.exports = mongoose.model("PO", POSchema);
