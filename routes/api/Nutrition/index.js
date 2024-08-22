const router = require("express").Router();
const auth = require("../../../middlewares/auth");

const {
  postNutrition,
  getNutrition,
  deleteNutrition,
} = require("../../../controllers/nutrition-controller");

router.post("/postnutrition", auth, postNutrition);
router.get("/", auth, getNutrition);
router.delete("/:_id", auth, deleteNutrition);
module.exports = router;
