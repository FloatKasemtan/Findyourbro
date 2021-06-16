const mongoose = require('mongoose');

let seniorSchema = mongoose.Schema({
    student_id:{
        type: String,
        require: true
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    pairSeniorCode:{
        type: String,
        require: true
    },
})

module.exports = mongoose.model('senior', seniorSchema);