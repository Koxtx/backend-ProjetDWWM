const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Votre alimentation");
});

module.exports = router;
