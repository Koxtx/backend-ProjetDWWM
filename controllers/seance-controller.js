const mongoose = require("mongoose");

const Seances = require("../models/seance.schema");

const getSeances = async (req, res) => {
  try {
    const seances = await Seances.find({});
    console.log("seances");
    res.json(seances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSeance = async (req, res) => {
  const seance = new Seances(req.body);
  try {
    const newSeance = await seance.save();
    res.status(201).json(newSeance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSeance = async (req, res) => {
  try {
    const seanceId = req.body.id;
    const updateData = {
      name: req.body.seance.name,
      day: req.body.seance.day,
      exercises: req.body.seance.exercises, // Assurez-vous d'inclure les exercices mis à jour
    };

    const seance = await Seances.findByIdAndUpdate(seanceId, updateData, {
      new: true,
    });
    if (!seance) return res.status(404).json({ message: "Seance not found" });

    res.json(seance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSeance = async (req, res) => {
  try {
    const seance = await Seances.findByIdAndDelete(req.body.id);
    if (!seance) return res.status(404).json({ message: "Session not found" });
    res.json({ message: "Session deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExercise = async (req, res) => {
  try {
    const { seanceId, exerciseId } = req.params;
    const seance = await Seances.findById(seanceId);
    if (!seance) return res.status(404).json({ message: "Session not found" });

    const exercise = seance.exercises.id(exerciseId);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });

    Object.assign(exercise, req.body);
    await seance.save();
    res.json(seance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const { seanceId, exerciseId } = req.params;
    const seance = await Seances.findById(seanceId);
    if (!seance) return res.status(404).json({ message: "Session not found" });

    const exercise = seance.exercises.id(exerciseId);
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });

    exercise.remove();
    await seance.save();
    res.json(seance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSeances,
  createSeance,
  updateSeance,
  deleteSeance,
  updateExercise,
  deleteExercise,
};
