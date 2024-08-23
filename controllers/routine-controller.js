const Routine = require("../models/routine.schema");

const postRoutine = async (req, res) => {
  const { userId, name, exercises } = req.body;

  try {
    const routine = new Routine({ userId, name, exercises });
    await routine.save();
    res.status(201).json(routine);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Erreur lors de l'ajout de la routine",
        error: err.message,
      });
  }
};
const getRoutine = async (req, res) => {
  try {
    const routines = await Routine.find({ userId: req.params.userId });
    res.status(200).json(routines);
  } catch (err) {
    res
      .status(400)
      .json({
        message: "Erreur lors de la récupération des routines",
        error: err.message,
      });
  }
};

module.exports = { postRoutine, getRoutine };
