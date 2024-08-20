const mongoose = require("mongoose");
const userSchema = require("../models/user.schema");
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
  return jwt.sign({ email }, process.env.SECRET, { expiresIn: "2h" });
};
const createTokenLogin = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2h" });
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

const getPivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const updateUserProfile = async (req, res) => {
  const { username, email } = req.body;

  try {
    // Trouver l'utilisateur par ID et mettre à jour les informations
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { username, email },
      { new: true } // Retourne le document après la mise à jour
    ).select("-password"); // Ne pas retourner le mot de passe

    if (!updatedUser) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  signupUser,
  verifyMail,
  loginUser,
  passwordUsers,
  resetPassword,
  getPivateUser,
  updateUserProfile,
};
