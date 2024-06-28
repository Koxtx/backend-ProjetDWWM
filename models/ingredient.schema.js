const mongoose = require("mongoose");

const ingredientSchema = new mongoose.Schema({
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
