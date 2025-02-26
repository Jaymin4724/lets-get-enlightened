import mongoose from "mongoose";

const MembershipPaymentSchema = new mongoose.Schema({
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "REGISTRATION_TBL.js",
  },
  plan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MEMBERSHIP_TBL.js",
  },
  price: {
    type: Number,
    required: true,
  },
  last_date: {
    type: Date,
    default: () => new Date(new Date().setMonth(new Date().getMonth() + 1)), 
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model(
  "MEMBERSHIP_PAYMENT_TBL",
  MembershipPaymentSchema,
  "MEMBERSHIP_PAYMENT_TBL"
);
