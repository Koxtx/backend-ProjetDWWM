const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: String,
  sets: [{ reps: Number, weight: Number }],
  rest: Number,
});

const seanceSchema = new mongoose.Schema({
  name: String,
  exercises: [ExerciseSchema],
  day: String,
});

module.exports = mongoose.model("Seance", seanceSchema);
