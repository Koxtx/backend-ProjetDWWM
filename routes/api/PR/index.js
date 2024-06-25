const router = require("express").Router();
const {
  getPRs,
  createPR,
  updatePR,
  deletePR,
  getLastWeekPRs,
  savePR,
} = require("../../../controllers/pr-controller");

router.get("/", getPRs);
router.post("/", createPR);
router.put("/:id", savePR);
router.put("/:id", updatePR);
router.delete("/:id", deletePR);
router.post("/last-week", getLastWeekPRs);

module.exports = router;
