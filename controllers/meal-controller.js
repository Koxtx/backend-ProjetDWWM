const Meal = require("../models/meal.schema");

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postMeal = async (req, res) => {
  try {
    const meal = new Meal(req.body);
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = { getMeals, postMeal };
