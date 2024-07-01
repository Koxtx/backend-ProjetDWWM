const PR = require("../models/pr.schema");

const getPRs = async (req, res) => {
  try {
    const prs = await PR.find({ exerciseId: req.params.id });
    res.json(prs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const savePR = async (req, res) => {
  try {
    const pr = await PR.findOneAndUpdate(
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
    const pr = new PR(req.body);
    await pr.save();
    res.status(201).json(pr);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updatePR = async (req, res) => {
  try {
    const pr = await PR.findByIdAndUpdate(req.params.id, req.body, {
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
    const pr = await PR.findByIdAndDelete(req.params.id);
    if (!pr) return res.status(404).json({ message: "PR not found" });
    res.json({ message: "PR deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLastWeekPRs = async (req, res) => {
  try {
    const exerciseIds = req.body.exerciseIds; // Assurez-vous que les IDs d'exercices sont correctement transmis depuis le frontend

    if (!exerciseIds || exerciseIds.length === 0) {
      return res.status(400).json({ message: "No exercise IDs provided" });
    }

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7); // Définir la date de début à 7 jours dans le passé
    const endDate = new Date();

    const lastWeekPRs = await PR.find({
      exerciseId: { $in: exerciseIds },
      date: { $gte: startDate, $lte: endDate },
    }).sort({ "sets.weight": -1, "sets.reps": -1 });

    if (lastWeekPRs.length === 0) {
      return res
        .status(404)
        .json({ message: "No previous performances found" });
    }

    res.json(lastWeekPRs);
  } catch (error) {
    console.error("Error fetching last week PRs:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getPRs,
  createPR,
  updatePR,
  deletePR,
  getLastWeekPRs,
  savePR,
};
