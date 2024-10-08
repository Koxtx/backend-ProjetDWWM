const mongoose = require("mongoose");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  primaryMuscle: { type: String, default: "Unknown" },
  secondaryMuscles: { type: [String] },
  equipment: { type: String },
  category: { type: String },
  difficulty: {
    type: String,
    enum: ["Débutant", "Intermédiaire", "Avancé"],
    default: "Intermédiaire",
  },
  imageUrl: { type: String },
  videoUrl: { type: String },
  duration: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("exercise", ExerciseSchema);
