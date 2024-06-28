const router = require("express").Router();
const { getMeals, postMeal } = require("../../../controllers/meal-controller");
const {
  getIngredients,
  postIngredient,
} = require("../../../controllers/ingredient-controller");

router.get("/meals", getMeals);
router.post("/meals", postMeal);
router.get("/ingredients", getIngredients);
router.post("/ingredients", postIngredient);

module.exports = router;
