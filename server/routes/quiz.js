const express = require('express');
const router = express.Router();
const Quiz = require('../model/quiz');
const Questions = require('../model/question');

router.post('/', (req, res) => {
    const quiz = new Quiz();
    quiz.save((err) => {
        if (err) return console.error(err);
        res.json(quiz);
    });
});

// router.get('/quizQuestions', (req, res) => {
//     Quiz.findOne({quizName: 'Quiz'}, (err, quizzer) => {
//         const round = (quizzer.currentRound - 1);
//         Questions.findOne({_id: quizzer.questions[round]}, (err, question) => {
//             res.json(question.question);
//         });
//     });
// });

module.exports = router;