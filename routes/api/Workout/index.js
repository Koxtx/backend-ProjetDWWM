const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postWorkout,
  getWorkout,
  deleteWorkout,
} = require("../../../controllers/workout-controller");

router.post("/postworkout", auth, postWorkout);
router.get("/", auth, getWorkout);
router.delete("/:id", auth, deleteWorkout);

module.exports = router;
