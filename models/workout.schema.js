const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: [
    {
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
      name: { type: String },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number },
      duration: { type: Number },
    },
  ],
  date: { type: Date, default: Date.now },
  totalDuration: { type: Number },
  caloriesBurned: { type: Number },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
