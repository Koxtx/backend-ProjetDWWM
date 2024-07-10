const router = require("express").Router();
const mongoose = require("mongoose");
const exercicesSchema = require("../../../models/exercices.schema");
const Exercices = mongoose.model("exercises", exercicesSchema);

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://wger.de/api/v2/exercise/", {
      headers: {
        Authorization: `Token ${process.env.WGER_API_KEY}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
