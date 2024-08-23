const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postExercice,
  putExercice,
  deleteExercice,
  getExercice,
  getFilteredExercises,
} = require("../../../controllers/exercice-controller");

router.get("/", getExercice);
router.post("/postexercice", auth, postExercice);
router.put("/putexercice/:_id", auth, putExercice);
router.delete("/deletexercice/:_id", auth, deleteExercice);
router.get("/search", getFilteredExercises);

module.exports = router;
