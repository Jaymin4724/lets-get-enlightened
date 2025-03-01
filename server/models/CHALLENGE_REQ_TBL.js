//cant check

import mongoose from "mongoose";

const ChallengesReqSchema = new mongoose.Schema({

  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL.js',
    required: true
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL.js',
    required: true
  },
  ch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CHALLENGES_TBL.js',
    // required: true
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CHALLENGE_REQ_STATUS_TBL.js',
    required: true,
    default: "65ae694a4f100d519f1ea238"
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },

  // Maintain data integrity and consistency
  // timestamps: true
});
export default mongoose.model("CHALLENGE_REQ_TBL", ChallengesReqSchema,"CHALLENGE_REQ_TBL");
