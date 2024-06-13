const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number,
  rest: Number,
  weight: Number,
});

const seanceSchema = new mongoose.Schema({
  name: String,
  exercises: [ExerciseSchema],
  day: String,
});

module.exports = { ExerciseSchema, seanceSchema };
