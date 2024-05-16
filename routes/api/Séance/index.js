const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Voici votre séance");
});

module.exports = router;
