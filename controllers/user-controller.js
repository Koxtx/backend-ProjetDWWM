const mongoose = require("mongoose");
const userSchema = require("../models/user.schema");
const Exercice = require("../models/exercices.schema");
const Recette = require("../models/recettes.schema");
const User = mongoose.model("User", userSchema);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  sendConfirmationEmail,
  sendValiditionAccount,
  sendInvalidEmailToken,
  sendPasswordForget,
} = require("../email/email");

const createTokenEmail = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "3600s" });
};
const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "60s" });
};
const createTokenPassword = (email) => {
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "60s" });
};

const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const token = createTokenEmail(email);
      console.log(token);
      await sendConfirmationEmail(email, token);
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({
        username,
        email,
        password: hashPassword,
        token,
      });
      await user.save();
      res.status(200).json({
        message:
          "Veuillez confirmer votre inscription en consultant votre boîte mail",
      });
    } else {
      res.status(400).json({
        message: "Email déjà existant",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyMail = async (req, res) => {
  const token = req.params.token;
  const isTokenNull = await User.findOne({ token: token });
  const decoded = jwt.verify(token, process.env.SECRET, {
    ignoreExpiration: true,
  });
  console.log(decoded.exp * 1000);
  console.log(new Date().getTime());
  try {
    if (!isTokenNull) {
      res.status(400).json({ message: "Token déjà validé" });
      return;
    }
    if (decoded.exp * 1000 > new Date().getTime()) {
      await User.findOneAndUpdate({ email: decoded.email }, { token: null });
      await sendValiditionAccount(decoded.email);
      res.json({ message: "Inscription confirmée avec succès" });
    } else {
      await User.findOneAndDelete({ email: decoded.email });
      await sendInvalidEmailToken(decoded.email);
      res.status(400).json({ message: "Token invalide ou expiré" });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!user.token) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          const token = createTokenLogin(user._id);
          res.status(200).json({ user, token });
        } else {
          res.status(400).json({ message: "Mauvais Email et/ou Password" });
        }
      } else {
        res.status(400).json({ message: " Email non validé" });
      }
    } else {
      res.status(400).json({ message: "Mauvais Email et/ou Password" });
    }
  } catch (error) {
    res.tatus(400).json({ error: error.message });
  }
};

const passwordUsers = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = createTokenPassword(email);
      await sendPasswordForget(email, token);

      res.status(200).json({
        message: "Veuillez consulter votre boite mail",
      });
    } else {
      res.status(400).json({
        message: "Email n'existe pas",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      const salt = await bcrypt.genSalt(10);
      const hashPassWord = await bcrypt.hash(password, salt);
      await User.findOneAndUpdate(
        { email },
        { password: hashPassWord, token: null }
      );
      console.log("user saved");
      res.status(200).json({
        message: "mot de passe modifié",
      });
    } else {
      res.status(400).json({
        message: "erreur",
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addFavorite = async (req, res) => {
  const { userId, itemId, itemType } = req.body;

  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (itemType === "exercise") {
      const exercise = await Exercice.findById(itemId);
      if (!exercise) {
        return res.status(404).json({ message: "Exercise not found" });
      }
      user.favorites.exercises.push(exercise._id);
    } else if (itemType === "recipe") {
      const recipe = await Recette.findById(itemId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      user.favorites.recipes.push(recipe._id);
    }

    await user.save();
    res.status(200).json({ message: "Favorite added" });
  } catch (error) {
    res.status(500).json({ message: "Error adding favorite", error });
  }
};

const removeFavorite = async (req, res) => {
  const { userId, itemId, itemType } = req.body;

  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (itemType === "exercise") {
      user.favorites.exercises.pull(itemId);
    } else if (itemType === "recipe") {
      user.favorites.recipes.pull(itemId);
    }

    await user.save();
    res.status(200).json({ message: "Favorite removed" });
  } catch (error) {
    res.status(500).json({ message: "Error removing favorite", error });
  }
};

module.exports = {
  signupUser,
  verifyMail,
  loginUser,
  passwordUsers,
  resetPassword,
  addFavorite,
  removeFavorite,
};
