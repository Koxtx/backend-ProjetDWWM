const Exercise = require("../models/exercice.schema");

const getExercice = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const postExercice = async (req, res) => {
  const {
    name,
    description,
    primaryMuscle,
    secondaryMuscles,
    equipment,
    imageUrl,
  } = req.body;
  try {
    const newExercise = new Exercise({
      name,
      description,
      primaryMuscle,
      secondaryMuscles,
      equipment,
      imageUrl,
    });
    const exercise = await newExercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const putExercice = async (req, res) => {
  const {
    name,
    description,
    primaryMuscle,
    secondaryMuscles,
    equipment,
    imageUrl,
  } = req.body;
  try {
    let exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ msg: "Exercise not found" });

    exercise.name = name || exercise.name;
    exercise.description = description || exercise.description;
    exercise.primaryMuscle = primaryMuscle || exercise.primaryMuscle;
    exercise.secondaryMuscles = secondaryMuscles || exercise.secondaryMuscles;
    exercise.equipment = equipment || exercise.equipment;
    exercise.imageUrl = imageUrl || exercise.imageUrl;

    await exercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const deleteExercice = async (req, res) => {
  try {
    let exercise = await Exercise.findById(req.params._id);
    if (!exercise) return res.status(404).json({ msg: "Exercise not found" });

    await exercise.remove();
    res.json({ msg: "Exercise removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getFilteredExercises = async (req, res) => {
  const { name, category, primaryMuscle, equipment, difficulty } = req.query;

  let filter = {};

  if (name) filter.name = { $regex: name, $options: "i" };
  if (category) filter.category = category;
  if (primaryMuscle) filter.primaryMuscle = primaryMuscle;
  if (equipment) filter.equipment = equipment;
  if (difficulty) filter.difficulty = difficulty;

  try {
    const exercises = await Exercise.find(filter);
    res.json(exercises);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  postExercice,
  putExercice,
  deleteExercice,
  getExercice,
  getFilteredExercises,
};
