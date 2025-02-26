import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
  plan: {
    type: String,
    required: true,
    unique: true,
  },
  s_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "STATUS_TBL.js",
    default: "65ae6d7937e1e60e7c1b0097",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  credit_points: {
    type: Number,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
});

export default mongoose.model(
  "MEMBERSHIP_TBL",
  MembershipSchema,
  "MEMBERSHIP_TBL"
);
