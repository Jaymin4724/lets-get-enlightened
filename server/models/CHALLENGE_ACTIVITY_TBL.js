//can't check activity table
import mongoose from "mongoose";

const ChallengesActivitySchema = new mongoose.Schema({
  // Foreign key for user reference
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL.js',
    required: true
  },

  // Foreign key for challenge reference
  ch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CHALLENGES_TBL.js',
    required: true
  },

  // Activity start date and time
  s_date: {
    type: Date,
    required: true,
    default: Date.now
  },

  // Activity end date and time (optional)
  e_date: {
    type: Date,
  },

  // Challenge completion status
  cs_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'COMPLETION_STATUS_TBL',
    // required: true
    
  },
  // Maintain data integrity and consistency
  // timestamps: true
});

export default mongoose.model("CHALLENGE_ACTIVITY_TBL", ChallengesActivitySchema,"CHALLENGE_ACTIVITY_TBL");
