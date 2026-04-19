const mongoose = require("mongoose");

const healthRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    default: "Health Record",
  },

  description: {
    type: String,
    required: true,
  },

  aiAnalysis: {
    riskLevel: String,
    healthScore: Number,
    recommendations: [String]
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HealthRecord", healthRecordSchema);
