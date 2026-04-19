// const mongoose = require('mongoose');

// const healthRecordSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   type: {
//     type: String,
//     enum: ['Checkup', 'Symptom', 'Medication', 'Exercise', 'Diet', 'Other'],
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   metrics: {
//     bloodPressure: String,
//     heartRate: Number,
//     temperature: Number,
//     weight: Number,
//     bloodSugar: Number,
//   },
//   aiAnalysis: {
//     riskLevel: String,
//     healthScore: Number,
//     recommendations: [String]
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('HealthRecord', healthRecordSchema);


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
