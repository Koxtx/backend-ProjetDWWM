const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const { getPivateUser } = require("../../../controllers/user-controller");

router.get("/privateuser", auth, getPivateUser);

module.exports = router;
