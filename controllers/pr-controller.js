const Pr = require("../models/pr.schema");

const getPRs = async (req, res) => {
  try {
    const prs = await Pr.find({ exerciseId: req.params.id });
    res.json(prs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const savePR = async (req, res) => {
  try {
    const pr = await Pr.findOneAndUpdate(
      { exerciseId: req.params.id },
      { sets: req.body.sets },
      { new: true, upsert: true }
    );
    res.json(pr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createPR = async (req, res) => {
  try {
    const pr = new Pr(req.body);
    await pr.save();
    res.status(201).json(pr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePR = async (req, res) => {
  try {
    const pr = await Pr.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pr) return res.status(404).json({ message: "PR not found" });
    res.json(pr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePR = async (req, res) => {
  try {
    const pr = await Pr.findByIdAndDelete(req.params.id);
    if (!pr) return res.status(404).json({ message: "PR not found" });
    res.json({ message: "PR deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPRs,
  createPR,
  updatePR,
  deletePR,
  savePR,
};
