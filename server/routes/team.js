const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Quiz = require('../model/quiz');
const Team = require('../model/team');

router.post('/addTeamName/:name', (req, res) => {
    Quiz.findOneAndUpdate({ quizName: 'Quiz' }, '_id', (err, quiz) => {

        Team.find({ teamName: req.params.name, quiz: quiz._id }, (err, docs) => {
            if (docs.length) {
                res.send('This team name is already taken')
            } else {
                const team = new Team({teamName: req.params.name, quiz: quiz._id});
                team.save((err) => {
                    if (err) return console.error(err);
                });

                Quiz.findOneAndUpdate({_id: quiz._id}, {$push: {teams: team._id}}, (err, quizz) => {
                    if (err) return console.error(err);
                })

                console.log(team);
                res.json(team)
            }
        });

    });
});

router.get('/allTeams', (req, res) => {
    Quiz.findOne({ quizName: 'Quiz' }, '_id', (err, quiz) => {
        Team.find({ 'quiz' : { $in: mongoose.Types.ObjectId(quiz._id) }}, (err, docs) => {
            if (err) return console.error(err);
            res.send(docs);
        });
    });
});

router.post('/reject/:teamId', (req, res) => {
    Team.findOne({ _id: req.params.teamId }, (err, team) => {
        if (err) return console.error(err);
        team.remove();
    });
    res.send('Removed teamId')
});

module.exports = router;