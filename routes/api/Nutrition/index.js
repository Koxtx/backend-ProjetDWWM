const router = require("express").Router();
const auth = require("../../../middlewares/auth");

const {
  postNutrition,
  getNutrition,
} = require("../../../controllers/nutrition-controller");

router.post("/postnutrition", auth, postNutrition);
router.get("/", auth, getNutrition);
module.exports = router;
