const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postExercice,
  putExercice,
  deleteExercice,
  getExercice,
} = require("../../../controllers/exercice-controller");

router.get("/", getExercice);
router.post("/postexercice", auth, postExercice);
router.put("/putexercice/:_id", auth, putExercice);
router.delete("/deletexercice/:_id", auth, deleteExercice);

module.exports = router;
