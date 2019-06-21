const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const questionSchema = require('../model/question');

const Questions = mongoose.model('Questions', questionSchema);


router.get('/randomQuestions',(req,res) => {
    Questions.find({}, (err, docs) => {
        if (err) return console.error(err);

        // const sixRandomQuestions = [];
        // for (let i = 0; i < 6; i++) {
        //     const randomNumber = Math.floor(Math.random() * docs.length - 1);
        //     sixRandomQuestions[i] = docs[randomNumber];
        // }

        res.json(docs);
    });
});

module.exports = router;