//enum: ['In progress', 'Completed', 'Abandoned'] // Customize options as needed
const mongoose = require('mongoose');

const ChallengesStatusSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    // maxLength: 50 // Limit description length
  },

  // Maintain data integrity and consistency
  timestamps: true
});

module.exports = mongoose.model("COMPLETION_STATUS_TBL", ChallengesStatusSchema,"COMPLETION_STATUS_TBL");
