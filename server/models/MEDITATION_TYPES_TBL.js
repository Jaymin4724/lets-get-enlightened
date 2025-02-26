import mongoose from "mongoose";

const MeditationTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  instructions: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
    default: "10 MINUETS",
  },
  s_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "STATUS_TBL.js",
    default: "65ae6d7937e1e60e7c1b0097",
  },
  audio_resource: {
    type: String,
  },
  video_resource: {
    type: String,
  },
});

export default mongoose.model(
  "MEDITATION_TYPES_TBL",
  MeditationTypeSchema,
  "MEDITATION_TYPES_TBL"
);
