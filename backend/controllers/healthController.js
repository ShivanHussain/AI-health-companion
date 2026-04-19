const HealthRecord = require('../models/HealthRecord');
const axios = require("axios");


const getHealthRecords = async (req, res) => {
  try {
    const healthRecords = await HealthRecord.find({ user: req.user._id })
      .sort({ date: -1 })
      .limit(50);

    res.json(healthRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord && healthRecord.user.toString() === req.user._id.toString()) {
      res.json(healthRecord);
    } else {
      res.status(404).json({ message: 'Health record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord && healthRecord.user.toString() === req.user._id.toString()) {
      healthRecord.type = req.body.type || healthRecord.type;
      healthRecord.title = req.body.title || healthRecord.title;
      healthRecord.description = req.body.description || healthRecord.description;
      healthRecord.date = req.body.date || healthRecord.date;
      healthRecord.metrics = req.body.metrics || healthRecord.metrics;

      const updatedRecord = await healthRecord.save();
      res.json(updatedRecord);
    } else {
      res.status(404).json({ message: 'Health record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteHealthRecord = async (req, res) => {
  try {
    const healthRecord = await HealthRecord.findById(req.params.id);

    if (healthRecord && healthRecord.user.toString() === req.user._id.toString()) {
      await healthRecord.deleteOne();
      res.json({ message: 'Health record removed' });
    } else {
      res.status(404).json({ message: 'Health record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const createHealthRecord = async (req, res) => {
  try {
    const { type, description } = req.body;

    console.log("type: ",type)

    console.log("description",description)

    if (!type || !description) {
      return res.status(400).json({
        message: "Please provide type and description"
      });
    }

    // CALL AI MODEL 
    const aiRes = await axios.post(
      process.env.AI_MODEL_URI,
      {
        type,
        description
      }
    );

    const aiData = aiRes.data;

    // SAVE IN DB
    const healthRecord = await HealthRecord.create({
      user: req.user._id,
      type,
      title: type + " record",
      description,
      aiAnalysis: {
        recommendations: aiData.recommendations,
        riskLevel: aiData.riskLevel,
        healthScore: aiData.healthScore
      },
    });

    res.status(201).json(healthRecord);

  } catch (error) {
    console.error("AI ERROR:", error.message);
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createHealthRecord,
  getHealthRecords,
  getHealthRecordById,
  updateHealthRecord,
  deleteHealthRecord,
};
