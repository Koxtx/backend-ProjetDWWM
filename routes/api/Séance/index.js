const router = require("express").Router();
const mongoose = require("mongoose");
const {
  getSeances,
  createSeance,
  updateSeance,
  deleteSeance,
  updateExercise,
  deleteExercise,
} = require("../../../controllers/seance-controller");

router.get("/", getSeances);
router.post("/", createSeance);
router.put("/", updateSeance);
router.delete("/", deleteSeance);
router.put("/:seanceId/exercises/:exerciseId", updateExercise);
router.delete("/:seanceId/exercises/:exerciseId", deleteExercise);

module.exports = router;
