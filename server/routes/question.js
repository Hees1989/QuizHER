const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Questions = require('../model/question');


//Bedoeling hiervan is dat je met 1 array 3 categorieen meegeeft

router.get('/randomQuestions',(req,res) => {
    Questions.find({category:{$in:[req.body.category1,req.body.category2,req.body.category3]}}).then(
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

module.exports = router;