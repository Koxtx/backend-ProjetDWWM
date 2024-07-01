const Goal = require("../models/goal.schema");

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postGoal = async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!goal) {
      return res.status(404).send();
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).send();
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getGoals,
  postGoal,
  updateGoal,
  deleteGoal,
};
