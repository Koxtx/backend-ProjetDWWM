const Ingredient = require("../models/ingredients.schema");

// Ajouter un nouvel ingrédient
const postIngredient = async (req, res) => {
  const { name, calories, protein, carbs, fat } = req.body;
  try {
    const newIngredient = new Ingredient({
      name,
      calories,
      protein,
      carbs,
      fat,
    });
    const ingredient = await newIngredient.save();
    res.json(ingredient);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Récupérer tous les ingrédients
const getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

// Supprimer un ingrédient
const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params._id);
    if (!ingredient)
      return res.status(404).json({ msg: "Ingredient not found" });

    await ingredient.remove();
    res.json({ msg: "Ingredient removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { postIngredient, getIngredients, deleteIngredient };
