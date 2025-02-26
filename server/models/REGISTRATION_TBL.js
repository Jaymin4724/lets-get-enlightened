import mongoose from "mongoose";

const RegistrationSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  lname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
  },
  dob: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  mem_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MEMBERSHIP_TBL.js",
    default: "65de0a84596a0d4f24ec161d",
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
  longest_streak: {
    type: Number,
    default: 0,
  },
  curr_streak: {
    type: Number,
    default: 0,
  },
  credit_points: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model(
  "REGISTRATION_TBL",
  RegistrationSchema,
  "REGISTRATION_TBL"
);
