const express = require('express');
const router = express.Router();
const {Workout} = require('../models')
const validateSession = require('../middleware/validateSession');
// router.get(“/”, (req, res) => {
//     Workout.findAll()
//     .then(workout => res.status(200).json(workout))
//     .catch(err => res.status(500).json({
//         error: err
//     }))
// })
router.post('/', async (req, res) => {
    try {
        const {description, definition, results} = req.body;
        const owner_id = req.user.id;
        
        let newWorkout = await Workout.create({
            description, definition, results, owner_id: owner_id
        });
        // let newWorkout = await Workout.create({
        //     description, definition, results
        // });
        res.status(200).json({
            workout: newWorkout,
            message: 'Workout logged!'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Workout failed to log.'
        })
    }
}
);

// get workout from user //

  router.get("/", validateSession, (req, res) => {
    let owner_id = req.user.id;
    Workout.findAll({
      where: { owner_id: req.user.id },
    })
      .then((workoutss) => res.starus(200).json(workouts))
      .catch((err) => res.status(500).json({ error: err }));
  });

// get workout from user id //  
  router.get("/:id", validateSession, (req, res) => {
    Workout.findOne({
        where: { id: req.params.id, owner_id: req.user.id }
    })
      .then((workouts) => res.status(200).json(workouts))
      .catch((err) => res.status(500).json({ error: err }));
  });

// Allow user to update workout //  
   
  router.put("/:id", validateSession, function (req, res) {
    const updateWorkoutLog = {
        description: req.body.description,
        definition: req.body.definition,
        results: req.body.results,
    };
    const query = { where: { id: req.params.id, owner_id: req.user.id } };
    Workout.update(updateWorkoutLog, query)
    .then((workouts) => res.status(200).json(workouts))
    .catch((err) => res.status(500).json({ error: err }));
});

// Allow user to delete workout log //


router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id } };
    Workout.destroy(query)
      .then(() => res.status(200).json({ message: "Workout Log Removed" }))
      .catch((err) => res.status(500).json({ error: err }));
  });
module.exports = router;