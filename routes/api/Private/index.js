const router = require("express").Router();
const auth = require("../../../middlewares/auth");
const {
  getPivateUser,
  updateUserProfile,
} = require("../../../controllers/user-controller");

router.get("/profile", auth, getPivateUser);

router.put("/putprofile", auth, updateUserProfile);

module.exports = router;
