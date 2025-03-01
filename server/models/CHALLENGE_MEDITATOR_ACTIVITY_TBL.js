//can't check activity table

const mongoose = require('mongoose');

const ChallengeMediatorActivitySchema = new mongoose.Schema({
  // Foreign key for user reference
  u_id1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL',
    required: true
  },
  u_id2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL',
    required: true
  },

//   // Foreign key for challenge reference
//   ch_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'challenges_tbl',
//     required: true
//   },


  // Activity start date and time
  start_date: {
    type: Date,
    required: true,
    default: Date.now
  },

  // Activity end date and time (optional)
  end_date: {
    type: Date,
  },

  // Maintain data integrity and consistency
  timestamps: true
});

module.exports = mongoose.model("CHALLENGE_MEDITATOR_ACTIVITY_TBL", ChallengeMediatorActivitySchema,"CHALLENGE_MEDITATOR_ACTIVITY_TBL");
