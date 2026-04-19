const express = require("express");
const router = express.Router();
const { createHealthRecord, getHealthRecordById, getHealthRecords, updateHealthRecord, deleteHealthRecord } = require("../controllers/healthController.js");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .post(protect, createHealthRecord)
  .get(protect, getHealthRecords);

router.route("/:id")
 .get(protect, getHealthRecordById)
 .put(protect, updateHealthRecord)
 .delete(protect, deleteHealthRecord);

module.exports = router;
