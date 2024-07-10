const router = require("express").Router();
const {
  getPRs,
  createPR,
  updatePR,
  deletePR,
  savePR,
} = require("../../../controllers/pr-controller");

router.get("/", getPRs);
router.post("/", createPR);
router.put("/:id", savePR);
router.put("/:id", updatePR);
router.delete("/:id", deletePR);

module.exports = router;
