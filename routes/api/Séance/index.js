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

router.get("/:seanceId", async (req, res) => {
  try {
    const seance = await Seances.findById(req.params.seanceId);
    if (!seance) return res.status(404).json({ message: "Seance not found" });
    res.json(seance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
