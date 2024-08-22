const Meal = require("../models/nutrition.schema");
const Ingredient = require("../models/ingredients.schema");

const postNutrition = async (req, res) => {
  const { name, ingredients } = req.body;
  if (!name || !ingredients || ingredients.length === 0) {
    return res.status(400).json({ msg: "Name and ingredients are required" });
  }
  try {
    // Vérifiez que le nom et les ingrédients sont fournis
    if (!name || !ingredients || ingredients.length === 0) {
      return res.status(400).json({ msg: "Name and ingredients are required" });
    }

    // Calcul des valeurs nutritionnelles
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;

    const mealIngredients = await Promise.all(
      ingredients.map(async (item) => {
        const ingredient = await Ingredient.findById(item.ingredient);
        if (!ingredient) {
          throw new Error(`Ingredient ${item.ingredient} not found`);
        }

        totalCalories += item.quantity * (ingredient.calories / 100);
        totalProtein += item.quantity * (ingredient.protein / 100);
        totalCarbs += item.quantity * (ingredient.carbs / 100);
        totalFat += item.quantity * (ingredient.fat / 100);

        return {
          ingredient: item.ingredient,
          quantity: item.quantity,
          calories: item.quantity * (ingredient.calories / 100),
          protein: item.quantity * (ingredient.protein / 100),
          carbs: item.quantity * (ingredient.carbs / 100),
          fat: item.quantity * (ingredient.fat / 100),
        };
      })
    );

    const newMeal = new Meal({
      user: req.user._id,
      name,
      ingredients: mealIngredients,
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
    });
    const meal = await newMeal.save();
    res.json(meal);
  } catch (error) {
    console.error("Error in postNutrition:", error.message);
    res.status(500).send("Server Error");
  }
};

const getNutrition = async (req, res) => {
  try {
    const meals = await Meal.find({ user: req.user._id }).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};
const deleteNutrition = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params._id);
    if (!meal) return res.status(404).json({ msg: "Meal not found" });

    // Assurez-vous que l'utilisateur est bien le propriétaire du repas
    if (meal.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await meal.remove();
    res.json({ msg: "Meal removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = { postNutrition, getNutrition, deleteNutrition };
