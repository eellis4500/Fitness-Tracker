var router = require('express').Router()
var Workout = require("../models/workout")

router.post('/api/workouts', (req, res) => {
    Workout.create({})
    .then(( dbworkouts ) => {
        res.json(dbworkouts)
    })
    .catch(err => {
        res.json(err);
    })
})

router.get('/api/workouts/range', (req, res) => {
    Workout.aggregate([{
        $addfields:{
            totalDuration:{
                $sum:"$exercises.duration"
            }
        }
    }])
    .sort({_id:-1})
    .then(( dbworkouts ) => {
        console.log(dbworkouts)
        res.json(dbworkouts)
    })
    .catch(err => {
        res.json(err);
    })
})

router.put('/api/workouts/:id', ({body, params}, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body }},
        { new: true })
        .then(( dbworkouts ) => {
            res.json(dbworkouts)
        })
        .catch(err => {
            res.json(err);
        })
})

router.get('/api/workouts', (req, res) => {
    Workout.find()
    .then(( dbworkouts ) => {
        console.log(dbworkouts)
        res.json(dbworkouts)
    })
    .catch(err => {
        res.json(err);
    })
})

module.exports = router