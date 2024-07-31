const Workout = require("../models/workout.schema");
const postWorkout = async (req, res) => {
  const { exercises } = req.body;
  try {
    const newWorkout = new Workout({ user: req.user._id, exercises });
    const workout = await newWorkout.save();
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
const getWorkout = async (req, res) => {
  const { page = 1, limit = 10, sortBy = "date", order = "asc" } = req.query;
  try {
    const workouts = await Workout.find({ user: req.user._id })
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await Workout.countDocuments({ user: req.user._id });
    res.json({
      workouts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  postWorkout,
  getWorkout,
};
