const router = require("express").Router();

const {
  signupUser,
  verifyMail,
  loginUser,
  passwordUsers,
  resetPassword,
} = require("../../../controllers/user-controller");

router.post("/inscription", signupUser);

router.post("/connexion", loginUser);

router.get("/verifyMail/:token", verifyMail);
router.post("/forgetpassword", passwordUsers);

router.post("/resetpassword", resetPassword);

module.exports = router;
