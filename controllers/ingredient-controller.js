const Ingredient = require("../models/ingredient.schema");

const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getIngredients, postIngredient };
