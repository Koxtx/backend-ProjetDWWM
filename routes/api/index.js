const router = require("express").Router();

const apiUsers = require("./Users");
const apiSeance = require("./Séance");
const apiPR = require("./PR");
const apiExRecette = require("./ExempleRecette");
const apiExExos = require("./ExempleExos");
const apiAlimentation = require("./alimentation");
//localhost:5000/api

router.use("/users", apiUsers);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});
router.use("/seances", apiSeance);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});
router.use("/prs", apiPR);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});
router.use("/recettes", apiExRecette);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});
router.use("/exercices", apiExExos);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});
router.use("/alimentation", apiAlimentation);
router.get("/", (req, res) => {
  res.send("localhost:5000/api");
});

module.exports = router;
