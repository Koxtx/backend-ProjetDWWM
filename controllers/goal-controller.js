const Goal = require("../models/goal.schema");
const postGoal = async (req, res) => {
  const { type, target } = req.body;
  try {
    const newGoal = new Goal({ user: req.user._id, type, target });
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

module.exports = { postGoal, putGoal };
