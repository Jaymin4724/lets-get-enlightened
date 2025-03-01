const mongoose = require('mongoose')

const ChallengesReqStatusSchema = mongoose.Schema({
    req_status : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("CHALLENGE_REQ_STATUS_TBL",ChallengesReqStatusSchema,"CHALLENGE_REQ_STATUS_TBL")

//const ChallengesReqStatus = require('./db/CHALLENGE_REQ_STATUS_TBL'); //table - affirmation_tbl

// const funRun = async () => {
//       try {
//         await ChallengesReqStatus.create({
//           req_status: "Pending"
//         });
//         await ChallengesReqStatus.create({
//           req_status: "Accepted"
//         });
//         await ChallengesReqStatus.create({
//           req_status: "Rejected"
//         });
              
//         console.log('Document inserted successfully');
//     } catch (error) {
//         console.error('Error inserting document:', error);
//     }

// }
// funRun();