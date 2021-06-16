const mongoose = require('mongoose');

let juniorSchema = mongoose.Schema({
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
    _user: {
        type: String,
        require: true
    },
    _pass: {
        type: String,
        require: true,
    },
    quota:{
        type: Number,
        require: true
    },
    pairSeniorCode:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('junior', juniorSchema);