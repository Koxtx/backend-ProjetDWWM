const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema({
  dailyCalories: {
    type: Number,
    required: true,
  },
  dailyProtein: {
    type: Number,
    required: true,
  },
  dailyCarbs: {
    type: Number,
    required: true,
  },
  dailyFat: {
    type: Number,
    required: true,
  },
});

const Goal = mongoose.model("Goal", goalSchema);

module.exports = Goal;
