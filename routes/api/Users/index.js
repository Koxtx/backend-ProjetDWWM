const router = require("express").Router();
const mongoose = require("mongoose");
const userSchema = require("../../../models/user.schema");
const User = mongoose.model("Users", userSchema);
const bcrypt = require("bcrypt");
const {
  signupUser,
  verifyMail,
  loginUser,
} = require("../../../controllers/user-controller");



router.post("/inscription", signupUser);

router.post("/connexion", loginUser);

router.get("/verifyMail/:token", verifyMail);

module.exports = router;
