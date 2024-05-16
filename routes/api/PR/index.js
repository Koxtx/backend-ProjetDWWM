const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Voila votre PR");
});

module.exports = router;
