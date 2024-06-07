const schema = require("mongoose").Schema;

const recettesSchema = schema({
  id: String,
  mealType: String,
  name: String,
  ingredients: [String],
  proteinContent: String,
  calorie: String,
  imageLink: String,
  preparation: String,
  liked: { type: Boolean, default: false },
});

module.exports = recettesSchema;
