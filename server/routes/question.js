const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Questions = require('../model/question');


//Bedoeling hiervan is dat je met 1 array 3 categorieen meegeeft

router.get('/randomQuestions/:category1/:category2/:category3', (req, res) => {
    // Questions.find({category:{$in:['Music','Sport','History']}}).then(
    Questions.find({
        category: {$in: [req.params.category1, req.params.category2, req.params.category3]},
        used: false
    }).then(
        questions => {
            const randomQuestions = [];
            const numberOfQuestions = 6;
            for (let i = 0; i < numberOfQuestions; i++) {
                const random = Math.ceil((questions.length - 1) * Math.random());
                randomQuestions[i] = questions[random];
            }
            res.json(randomQuestions)
        }
    )
});



router.post('/setUsed/:question', (req, res) => {
    
    let query = {'question':req.params.question};
    Questions.findOneAndUpdate(query, {used:true}, {upsert:false}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
    }
);

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

module.exports = router;