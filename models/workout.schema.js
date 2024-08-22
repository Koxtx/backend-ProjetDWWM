const mongoose = require("mongoose");

const WorkoutSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  exercises: [
    {
      exercise: { type: mongoose.Schema.Types.ObjectId, ref: "Exercise" },
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      weight: { type: Number }, // Pour les exercices de musculation
      duration: { type: Number }, // Pour les exercices cardio (en secondes)
    },
  ],
  date: { type: Date, default: Date.now },
  totalDuration: { type: Number }, // Durée totale de la séance
  caloriesBurned: { type: Number }, // Calories brûlées (peut être calculé en fonction des exercices)
});

module.exports = mongoose.model("Workout", WorkoutSchema);
