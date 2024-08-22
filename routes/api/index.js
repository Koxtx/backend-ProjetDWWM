const router = require("express").Router();
const apiUsers = require("./Users");
const apiWorkout = require("./Workout");
const apiNutrition = require("./Nutrition");
const apiExercice = require("./Exercice");
const apiGoal = require("./Goal");
const apiPrivate = require("./Private");
const apiPublic = require("./Public");
const apiIngredients = require("./Ingredients");

//localhost:5000/api

router.use("/users", apiUsers);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});
router.use("/workout", apiWorkout);
router.use("/nutrition", apiNutrition);
router.use("/exercice", apiExercice);
router.use("/goal", apiGoal);
router.use("/private", apiPrivate);
router.use("/public", apiPublic);
router.use("/ingredient", apiIngredients);

module.exports = router;
