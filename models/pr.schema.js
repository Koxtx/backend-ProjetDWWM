const mongoose = require("mongoose");

const PRSchema = new mongoose.Schema({
  exerciseId: {
    type: String,
    required: true,
  },
  sets: [
    {
      reps: Number,
      weight: Number,
      validated: Boolean,
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PR", PRSchema);
