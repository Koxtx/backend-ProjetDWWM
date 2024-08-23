const Progress = require("../models/progress.schema");

const postProgress = async (req, res) => {
  const { userId, weight, reps, exerciseId } = req.body;

  try {
    const progress = new Progress({ userId, weight, reps, exerciseId });
    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Erreur lors de l'ajout des progrès",
        error: err.message,
      });
  }
};
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId });
    res.status(200).json(progress);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la récupération des progrès",
        error: err.message,
      });
  }
};

module.exports = { postProgress, getProgress };
