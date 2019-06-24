const mongoose = require('mongoose');
mongoose.set('debug', true);

const questionSchema = new mongoose.Schema({
    question: {type:String, required:true},
    answer: {type:String, required:true},
    category:{type:String, required:true}
});

const Questions = mongoose.model('Questions',questionSchema,'Questions');

module.exports = Questions;