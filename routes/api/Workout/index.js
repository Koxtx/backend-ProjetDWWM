const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postWorkout,
  getWorkout,
} = require("../../../controllers/workout-controller");

router.post("/postworkout", auth, postWorkout);
router.get("/", auth, getWorkout);

module.exports = router;
