const mongoose = require("mongoose");

const PRSchema = new mongoose.Schema({
  exerciseId: String,
  sets: [
    {
      reps: Number,
      weight: Number,
      validated: Boolean,
    },
  ],
});

module.exports = mongoose.model("PR", PRSchema);
