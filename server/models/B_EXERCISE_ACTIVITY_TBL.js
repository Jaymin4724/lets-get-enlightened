//can't check activity table

const mongoose = require('mongoose');

const B_exerciseSchema = new mongoose.Schema({

  // Foreign key for user reference
  u_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'REGISTRATION_TBL',
    required: true
  },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },

  usage_duration: {
    type: Number,
    required: true
  },

  // Ensure data integrity and consistency
  // timestamps: true
});

module.exports = mongoose.model("B_EXERCISE_ACTIVITY_TBL", B_exerciseSchema,"B_EXERCISE_ACTIVITY_TBL");
