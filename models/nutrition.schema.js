const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  ingredients: [
    {
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
      quantity: { type: Number, required: true }, // en grammes par exemple
      calories: { type: Number, required: true },
      protein: { type: Number, required: true },
      carbs: { type: Number, required: true },
      fat: { type: Number, required: true },
    },
  ],
  totalCalories: { type: Number, required: true },
  totalProtein: { type: Number, required: true },
  totalCarbs: { type: Number, required: true },
  totalFat: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Meal", MealSchema);
