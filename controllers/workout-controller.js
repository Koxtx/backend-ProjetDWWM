const Workout = require("../models/workout.schema");
const postWorkout = async (req, res) => {
  const { name, exercises } = req.body;
  try {
    if (!req.user || !name) {
      return res.status(400).json({ msg: "User and name are required" });
    }

    const newWorkout = new Workout({
      user: req.user._id, // Utilisation de l'ID utilisateur directement
      name,
      exercises,
    });

    const workout = await newWorkout.save();
    res.json(workout);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getWorkout = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(workouts); // Renvoie les résultats en JSON
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" }); // Assurez-vous que cette ligne utilise res.json()
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params._id);
    if (!workout) return res.status(404).json({ msg: "Workout not found" });

    // Assurez-vous que l'utilisateur est bien le propriétaire du workout
    if (workout.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await workout.remove();
    res.json({ msg: "Workout removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  postWorkout,
  getWorkout,
  deleteWorkout,
};
