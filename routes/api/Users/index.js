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
  addFavorite,
  removeFavorite,
} = require("../../../controllers/user-controller");

router.post("/inscription", signupUser);

router.post("/connexion", loginUser);

router.get("/verifyMail/:token", verifyMail);
router.post("/forgetpassword", passwordUsers);

router.post("/resetpassword", resetPassword);

router.post("/addFavorite", addFavorite);
router.post("/removeFavorite", removeFavorite);

module.exports = router;
