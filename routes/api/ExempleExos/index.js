const router = require("express").Router();
const mongoose = require("mongoose");
const exercicesSchema = require("../../../models/exercices.schema");
const Exercices = mongoose.model("exercises", exercicesSchema);

router.get("/", (req, res) => {
  Exercices.find()
    .then((e) => res.status(200).json(e))
    .catch((err) => console.log(err));
});

module.exports = router;
