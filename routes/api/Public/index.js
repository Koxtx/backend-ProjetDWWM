const router = require("express").Router();
const { getExercice } = require("../../../controllers/exercice-controller");

router.get("/", getExercice);
module.exports = router;
