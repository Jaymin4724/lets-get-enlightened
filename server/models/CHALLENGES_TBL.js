import mongoose from "mongoose";

const ChallengesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // maxLength: 25  // Limit name length
  },
  description: {
    type: String,
    // maxLength: 200  // Limit description length
  },
  duration: {
    type: Number,
    required: true  // Assuming a specific duration format
  },
  image: {
    type: String,
    required: true
  },
  // s_id: {
  //   type: String,
  //   ref: 'STATUS_TBL.js',
  //   required: true
  // },
  // med_id: {
  //   type: String,
  //   ref: 'MEDITATION_TYPES_TBL.js'
  // },
  credit_points: {
    type: Number,
    required: true
  },

 
});

export default mongoose.model("CHALLENGES_TBL", ChallengesSchema,"CHALLENGES_TBL");

//const Challenges = require('./db/CHALLENGE_RESULT_TBL'); //table - affirmation_tbl

// const funRun = async () => {
//       try {
//         await Challenges.create({
//           name: "Completed",
//           description:"",
//           duration:"",
//           s_id:"",
//           med_id:"",
//           credit_points:""

//         });
        
              
//         console.log('Document inserted successfully');
//     } catch (error) {
//         console.error('Error inserting document:', error);
//     }

// }
// funRun();
