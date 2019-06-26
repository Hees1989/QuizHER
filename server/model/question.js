const mongoose = require('mongoose');
mongoose.set('debug', true);

const questionSchema = new mongoose.Schema({
    question: String,
    answer: String,
    category: String,
    used: {
        type: Boolean,
        default: false
    }
});

const Questions = mongoose.model('Questions',questionSchema,'Questions');

module.exports = Questions;