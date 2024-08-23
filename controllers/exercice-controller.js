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
  try {
    const { muscle, equipment, difficulty } = req.query;
    let filters = {};

    if (muscle) filters.primaryMuscle = muscle;
    if (equipment) filters.equipment = equipment;
    if (difficulty) filters.difficulty = difficulty;

    const exercises = await Exercise.find(filters);
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
};

module.exports = {
  postExercice,
  putExercice,
  deleteExercice,
  getExercice,
  getFilteredExercises,
};
