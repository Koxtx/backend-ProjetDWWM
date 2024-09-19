const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  type: { type: String, required: true }, // Type général de l'objectif (ex: répétitions, poids, etc.)
  targetType: { type: String, required: true }, // Le type de cible (répétitions, temps, poids, répétitions avec poids)
  target: { type: Number }, // Pour les cibles simples comme le temps ou le poids seul
  reps: { type: Number }, // Si le type de cible est répétitions ou répétitions avec poids
  weight: { type: Number }, // Si le type de cible inclut un poids
  progress: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("goal", GoalSchema);
