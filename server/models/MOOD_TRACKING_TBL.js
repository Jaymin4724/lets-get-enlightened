import mongoose from "mongoose";

const MoodTrackingSchema = new mongoose.Schema({
  // Foreign key for user reference
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL',
    required: true
  },

  // Core mood tracking data
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },

  exp_share: {
    type: String,
    // maxLength: 255
  },

  result: {
    type: Number,
    required: true
  }
 
});

export default mongoose.model("MOOD_TRACKING_TBL", MoodTrackingSchema,"MOOD_TRACKING_TBL");


 // // Foreign keys for question and answer references
  // que_ans1_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'MOOD_QUESTIONAIRE_TBL'
  // },
  // que_ans2_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'MOOD_QUESTIONAIRE_TBL'
  // },
  // que_ans3_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'MOOD_QUESTIONAIRE_TBL'
  // },
  // que_ans4_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'MOOD_QUESTIONAIRE_TBL'
  // },