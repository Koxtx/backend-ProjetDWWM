const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postIngredient,
  getIngredients,
  deleteIngredient,
} = require("../../../controllers/ingredients-controller");

router.post("/postingredient", auth, postIngredient);
router.get("/", auth, getIngredients);
router.delete("/:_id", auth, deleteIngredient);

module.exports = router;
