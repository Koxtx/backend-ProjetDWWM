const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../../../models/user.schema");
const User = mongoose.model("Users", userSchema);
const bcrypt = require("bcrypt");
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
