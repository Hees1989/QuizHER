const mongoose = require('mongoose');
require('./team');
require('./question');

const quizSchema = new mongoose.Schema(
    {
            quizName:{type: String,default:'Quiz'},
        started: {type: Boolean, default:false},
        teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Teams'}],
        currentRound: {type: Number, default :0},
        maximumRounds: {type: Number, default:3},
        roundFinished: {type: Boolean,default:false},
        questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Questions'}]
    }
);
const Quiz = mongoose.model('Quiz',quizSchema,'Quiz');

module.exports = Quiz;
