const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    requirements: { type: String, required: true },
    stipend: { type: Number, required: true },
    PO: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PO' }],
    PEO: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PEO' }],
    SDGS: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SDGS' }],

}, { timestamps: true });

module.exports = mongoose.model("Internship", internshipSchema);
