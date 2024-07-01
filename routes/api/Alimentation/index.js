const router = require("express").Router();
const { getMeals, postMeal } = require("../../../controllers/meal-controller");
const {
  getIngredients,
  postIngredient,
} = require("../../../controllers/ingredient-controller");

const {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
} = require("../../../controllers/goal-controller");

router.get("/meals", getMeals);
router.post("/meals", postMeal);
router.get("/ingredients", getIngredients);
router.post("/ingredients", postIngredient);

router.get("/goals", getGoals);
router.post("/goals", postGoal);
router.put("/goals/:id", updateGoal);
router.delete("/goals/:id", deleteGoal);

module.exports = router;
