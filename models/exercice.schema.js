const mongoose = require("mongoose");
const express = require("express");

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  primaryMuscle: { type: String, default: "Unknown" },
  secondaryMuscles: { type: [String] },
  equipment: { type: String },
  imageUrl: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("exercise", ExerciseSchema);
