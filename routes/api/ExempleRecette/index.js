const router = require("express").Router();
const mongoose = require("mongoose");
const recettesSchema = require("../../../models/recettes.schema");
const Recttes = mongoose.model("ExempleRecette", recettesSchema);

router.get("/", (req, res) => {
  Recttes.find()
    .then((r) => res.status(200).json(r))
    .catch((err) => console.log(err));
});

module.exports = router;
