const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: () => new Date()
    },
    exercises: [{
        type: {
            type: String,
        },
        name: {
            type: String,
        },
        duration: {
            type: Number,
        },
        weight: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        },
    }]
}, { toJSON: { virtuals: true } });

WorkoutSchema.virtual('totalDuration').get(function () {
    return this.exercises.reduce((sum, workout) => { return sum + workout.duration }, 0)
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;