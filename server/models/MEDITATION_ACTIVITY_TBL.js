import mongoose from "mongoose";

const MedicationActivitySchema = new mongoose.Schema({
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "REGISTRATION_TBL",
    required: true,
  },
  med_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MEDITATION_TYPES_TBL",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  usage_duration: {
    type: Number,
    required: true,
  },
});

export default mongoose.model(
  "MEDITATION_ACTIVITY_TBL",
  MedicationActivitySchema,
  "MEDITATION_ACTIVITY_TBL"
);
