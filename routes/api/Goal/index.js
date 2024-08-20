const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postGoal,
  putGoal,
  getGoals,
} = require("../../../controllers/goal-controller");

router.post("/postgoal", auth, postGoal);
router.put("/putgoal/:_id", auth, putGoal);
router.get("/", auth, getGoals);

module.exports = router;
