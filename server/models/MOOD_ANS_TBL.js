const mongoose = require('mongoose');

const MoodAnsSchema = new mongoose.Schema({
  mood_category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("MOOD_ANS_TBL", MoodAnsSchema,"MOOD_ANS_TBL");
