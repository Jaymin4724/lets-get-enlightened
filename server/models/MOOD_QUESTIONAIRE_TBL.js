//DONE

import mongoose from "mongoose";

const MoodQuestionnaireSchema = new mongoose.Schema({
  que_txt: {
    type: String,
    required: true,
    // maxLength: 200  // Limit question text length
  },

  // Foreign key for question status tracking
  s_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'STATUS_TBL',
    default: "65ae6d7937e1e60e7c1b0097",
    required: true
  },


});

export default mongoose.model("MOOD_QUESTIONAIRE_TBL", MoodQuestionnaireSchema,"MOOD_QUESTIONAIRE_TBL");

//const MoodQues = require('./db/MOOD_QUESTIONAIRE_TBL'); //table - affirmation_tbl

// const funRun = async () => {
//   try {
//       const statusId = new mongoose.Types.ObjectId("65ae6d7937e1e60e7c1b0097");
//       await MoodQues.create({
//           que_txt: "Rate your overall mood before the meditation session?",
//           s_id: statusId,
//       });
//       await MoodQues.create({
//         que_txt: "Did the meditation improve your focus and mental clarity?",
//         s_id: statusId,
//     });
//     await MoodQues.create({
//       que_txt: "Describe your emotional well-being after the meditation?",
//       s_id: statusId,
//   });
//   await MoodQues.create({
//     que_txt: "Rate your level of satisfaction with the meditation experience.",
//     s_id: statusId,
// });
// await MoodQues.create({
//   que_txt: "On a scale of 1 to 5, how would you rate your overall mood?",
//   s_id: statusId,
// });   
//       console.log('Document inserted successfully');
//   } catch (error) {
//       console.error('Error inserting document:', error);
//   }
// }

// funRun();

