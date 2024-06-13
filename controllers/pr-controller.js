const prSchema = require("../models/pr.schema");

const getPRs = async (req, res) => {
  try {
    const prs = await prSchema.find();
    res.json(prs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPR = async (req, res) => {
  const pr = new prSchema(req.body);
  try {
    const newPR = await pr.save();
    res.status(201).json(newPR);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePR = async (req, res) => {
  try {
    const pr = await prSchema.findByIdAndUpdate(req.params.id, req.body, {
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
    const pr = await prSchema.findByIdAndDelete(req.params.id);
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
};
