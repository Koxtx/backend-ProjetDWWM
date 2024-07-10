const router = require("express").Router();
const mongoose = require("mongoose");
const fetch = require("node-fetch");
const recettesSchema = require("../../../models/recettes.schema");
const Recettes = mongoose.model("ExempleRecette", recettesSchema);
const {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
} = require("../../../controllers/goal-controller");

router.get("/goals", getGoals);
router.post("/goals", postGoal);
router.put("/goals/:id", updateGoal);
router.delete("/goals/:id", deleteGoal);

router.get("/", (req, res) => {
  Recettes.find()
    .then((r) => res.status(200).json(r))
    .catch((err) => console.log(err));
});

router.get("/spoonacular", async (req, res) => {
  const query = req.query.query;
  const number = req.query.number || 10;

  console.log("Received request for Spoonacular recipes with query:", query);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${number}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (
      response.status === 402 ||
      data.message ===
        "Your daily points limit of 150 has been reached. Please upgrade your plan to continue using the API."
    ) {
      res.status(402).json({
        message:
          "Votre limite quotidienne de points a été atteinte. Veuillez mettre à niveau votre plan pour continuer à utiliser l'API.",
      });
      return;
    }

    console.log("Spoonacular response:", data);

    if (data.results && data.results.length > 0) {
      const getRecipeDetails = async (recipeId) => {
        const detailsResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`
        );
        return await detailsResponse.json();
      };

      const detailedRecipes = await Promise.all(
        data.results.map(async (recipe) => {
          const details = await getRecipeDetails(recipe.id);
          return {
            id: details.id.toString(),
            mealType: details.dishTypes[0] || "Unknown",
            name: details.title,
            ingredients: details.extendedIngredients.map(
              (ingredient) => ingredient.original
            ),
            proteinContent:
              details.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Protein"
              )?.amount || "Unknown",
            calorie:
              details.nutrition.nutrients.find(
                (nutrient) => nutrient.name === "Calories"
              )?.amount || "Unknown",
            imageLink: details.image,
            preparation: details.instructions || "",
            liked: false,
            source: "spoonacular",
          };
        })
      );

      res.status(200).json(detailedRecipes);
    } else {
      res.status(200).json({ message: "Aucune recette trouvée" });
    }
  } catch (error) {
    console.error("Error fetching recipes from Spoonacular:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/searchByIngredients", async (req, res) => {
  const ingredients = req.query.ingredients;

  console.log("Received request for recipes with ingredients:", ingredients);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (response.status === 402) {
      res.status(402).json({ message: "Quota exceeded for the API requests" });
      return;
    }

    console.log("Spoonacular response:", data);

    if (data) {
      const recipes = data.map((recipe) => ({
        id: recipe.id.toString(),
        name: recipe.title,
        ingredients: recipe.usedIngredients.map(
          (ingredient) => ingredient.original
        ),
        imageLink: recipe.image,
        liked: false,
        source: "spoonacular",
      }));

      res.status(200).json(recipes);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(
      "Error fetching recipes by ingredients from Spoonacular:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/searchByNutrients", async (req, res) => {
  const { minCarbs, maxCarbs, minProtein, maxProtein, number } = req.query;

  console.log("Received request for recipes by nutrients:", req.query);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByNutrients?minCarbs=${
        minCarbs || 0
      }&maxCarbs=${maxCarbs || 1000}&minProtein=${minProtein || 0}&maxProtein=${
        maxProtein || 1000
      }&number=${number || 10}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (response.status === 402) {
      res.status(402).json({ message: "Quota exceeded for the API requests" });
      return;
    }

    console.log("Spoonacular response:", data);

    if (data) {
      const recipes = data.map((recipe) => ({
        id: recipe.id.toString(),
        name: recipe.title,
        calories: recipe.calories,
        proteinContent: recipe.protein,
        imageLink: recipe.image,
        liked: false,
        source: "spoonacular",
      }));

      res.status(200).json(recipes);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(
      "Error fetching recipes by nutrients from Spoonacular:",
      error
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/food/info", async (req, res) => {
  const { foodId } = req.query;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/food/ingredients/${foodId}/information?amount=1&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (data.message) {
      res.status(402).json({ message: data.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error fetching food information:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/food/convert", async (req, res) => {
  const { ingredientName, sourceAmount, sourceUnit, targetUnit } = req.query;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/convert?ingredientName=${ingredientName}&sourceAmount=${sourceAmount}&sourceUnit=${sourceUnit}&targetUnit=${targetUnit}&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (data.message) {
      res.status(402).json({ message: data.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error converting units:", error);
    res.status(500).send("Server Error");
  }
});

router.get("/mealplanner", async (req, res) => {
  const { timeFrame, targetCalories, diet, exclude } = req.query;

  try {
    const response = await fetch(
      `https://api.spoonacular.com/mealplanner/generate?timeFrame=${
        timeFrame || "day"
      }&targetCalories=${targetCalories || 2000}&diet=${diet || ""}&exclude=${
        exclude || ""
      }&apiKey=${process.env.SPOONACULAR_API_KEY}`
    );
    const data = await response.json();

    if (data.message) {
      res.status(402).json({ message: data.message });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.error("Error generating meal plan:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
