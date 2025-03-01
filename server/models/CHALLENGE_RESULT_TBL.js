import mongoose from "mongoose";

const ChallengesResultSchema = mongoose.Schema({
    result_status : {
        type : String,
        required : true
    }
})

export default mongoose.model("CHALLENGE_RESULT_TBL",ChallengesResultSchema,"CHALLENGE_RESULT_TBL")

//const ChallengesResultStatus = require('./db/CHALLENGE_RESULT_TBL'); //table - affirmation_tbl

// const funRun = async () => {
//       try {
//         await ChallengesResultStatus.create({
//           result_status: "Completed"
//         });
//         await ChallengesResultStatus.create({
//           result_status: "Not Completed"
//         });
//         await ChallengesResultStatus.create({
//           result_status: "In Progress"
//         });
              
//         console.log('Document inserted successfully');
//     } catch (error) {
//         console.error('Error inserting document:', error);
//     }

// }
// funRun();
