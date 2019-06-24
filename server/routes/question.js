const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Questions = require('../model/question');
const Quiz = require('../model/quiz');


//Bedoeling hiervan is dat je met 1 array 3 categorieen meegeeft

router.get('/randomQuestions/:category1/:category2/:category3',(req,res) => {
    // Questions.find({category:{$in:['Music','Sport','History']}}).then(
        Questions.find({category:{$in:[req.params.category1,req.params.category2,req.params.category3]}}).then(
        questions => {
            const randomQuestions = [];
            for (let i = 0; i < 12; i++) {
                const random = Math.ceil((questions.length - 1) * Math.random() );
                randomQuestions[i] = questions[random];
            }
            res.json(randomQuestions)
        }
    )
});

router.get('/allCategories', (req, res) => {
    Questions.distinct('category', (err, docs) => {
        if (err) {
            throw new Error('Er is iets gruwelijk mis gegaan!');
        }
        res.json({
            categories: docs
        });
    });
});

router.get('/:quizId', (req, res) => {
    Quiz.find({_id: req.params.quizId}, (err, quiz) => {
        const round = quiz.currentRound;
        Questions.find({_id: quiz.questions[round]}, (err, question) => {
            res.json(question.question);
        });
    });
});

module.exports = router;