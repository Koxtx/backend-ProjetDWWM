const Goal = require("../models/goal.schema");

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id }).sort({ date: -1 });
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const postGoal = async (req, res) => {
  const { type, targetType, target, reps, weight } = req.body; // Récupère les nouveaux champs
  try {
    const newGoal = new Goal({
      user: req.user._id,
      type,
      targetType,
      target: targetType === "time" || targetType === "weight" ? target : undefined,
      reps: targetType === "repetitions" || targetType === "repsWithWeight" ? reps : undefined,
      weight: targetType === "weight" || targetType === "repsWithWeight" ? weight : undefined,
    });
    const goal = await newGoal.save();
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const putGoal = async (req, res) => {
  const { progress } = req.body;
  try {
    const goal = await Goal.findById(req.params._id);
    if (!goal) return res.status(404).json({ msg: "Goal not found" });

    goal.progress = progress;
    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { postGoal, putGoal, getGoals };
