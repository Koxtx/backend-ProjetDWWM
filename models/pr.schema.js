const { default: mongoose } = require("mongoose");

const schema = require("mongoose").Schema;

const PRSchema = new mongoose.Schema({
  exerciseName: String,
  bestReps: Number,
  bestWeight: Number,
});

module.exports = PRSchema;
