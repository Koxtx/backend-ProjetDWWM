const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postRoutine,
  getRoutine,
} = require("../../../controllers/routine-controller");

router.post("/add", auth, postRoutine);
router.get("/", auth, getRoutine);

module.exports = router;
