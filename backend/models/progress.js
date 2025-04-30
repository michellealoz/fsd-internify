const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    completed: { type: Boolean, default: false }
}, { _id: false });

const progressSchema = new mongoose.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    daysSpent: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    milestones: [milestoneSchema],
    completion: { type: Number, default: 0 },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },

});

progressSchema.methods.calculateCompletion = function() {
    if (this.milestones?.length > 0) {
        const completed = this.milestones.filter(m => m.completed).length;
        return Math.round((completed / this.milestones.length) * 100);
    }
    const totalDays = Math.ceil(
        (this.endDate - this.startDate) / (1000 * 60 * 60 * 24)
    );
    return Math.round((this.daysSpent / totalDays) * 100);
};

module.exports = mongoose.model("Progress", progressSchema);
