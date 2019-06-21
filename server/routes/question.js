const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Questions = require('../model/question');


router.get('/randomQuestions',(req,res) => {
    Questions.find({category:{$in:['Art and Literature','Music']}}).then(
        questions => {

            const sixRandomQuestions = [];
            for (let i = 0; i < 6; i++) {
                const randomNumber = Math.ceil((questions.length - 1) * Math.random() );
                sixRandomQuestions[i] = questions[randomNumber];
            }
            res.json(sixRandomQuestions)
        }
    )
});

module.exports = router;