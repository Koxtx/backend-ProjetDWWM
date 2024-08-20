const Nutrition = require("../models/nutrition.schema");

const postNutrition = async (req, res) => {
  const { meals } = req.body;
  console.log("Meals received:", meals); // Log pour vérifier les données reçues
  try {
    const newNutrition = new Nutrition({ user: req.user._id, meals });
    const nutrition = await newNutrition.save();
    res.json(nutrition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

const getNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(nutrition);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = { postNutrition, getNutrition };
