//--DONE--//
const mongoose = require('mongoose')

const StatusSchema = mongoose.Schema({
    s_id : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("STATUS_TBL",StatusSchema,"STATUS_TBL")

// const Status = require('./db/STATUS_TBL');
// const funRun = async () => {
//     try {
//         await Status.create({
//           s_id:"Active"
//         });
//         await Status.create({
//           s_id:"Inactive"
//         });
        
//         console.log('successfully');
//       } catch (error) {
//         console.error('Error inserting document:', error);
//       }
//     };
    
//     funRun();

