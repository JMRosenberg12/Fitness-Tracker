// Remember to require the mongo because mongo helps the mongoose.
const db = require("../Develop/models");
const mongojs = require("mongojs");



module.exports = function(app) {
    // This route helps to get all the workouts from the database
    app.get("/api/workouts", function(req, res) {
        db.Workout.find({}).then(function(dbWorkouts) {
            res.json(dbWorkouts);
        });
    });

    // This route lets you add an exercise to an existing workout
    app.put("/api/workouts/:id", function(req, res) {
        db.Workout.find({ _id: mongojs.ObjectId(req.params.id) }, (error, found) => {
            if (error) {
                console.log(error);
            } else {
                console.log(found);
                const newExercise = req.body;
                console.log(newExercise);
                const exerciseList = found[0].exercises;
                exerciseList.push(newExercise);
                db.Workout.updateOne(
                    {
                        _id: mongojs.ObjectId(req.params.id)
                    },
                    {
                        $set: {
                            exercises: exerciseList
                        }
                    },
                    (error, edited) => {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send(edited);
                        }
                    }
                );
            }
        });
    });

    // This route helps you create a new workout
    app.post("/api/workouts/", function(req, res) {
        db.Workout.create({})
        .then(data => {
            res.json(data);
        });
    });

    // This route can only return the last 7 workouts
    app.get("/api/workouts/range", function(req, res) {
        db.Workout.find({}).then(function(dbWorkouts) {
            while(dbWorkouts.length > 7) {
                let first = dbWorkouts.shift()
            }
            res.json(dbWorkouts);
        });
    });
}
