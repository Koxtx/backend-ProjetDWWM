const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  postProgress,
  getProgress,
} = require("../../../controllers/progress-controller");

router.post("/add", auth, postProgress);
router.get("/", auth, getProgress);

module.exports = router;
