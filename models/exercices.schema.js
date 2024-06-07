const schema = require("mongoose").Schema;

const exercicesSchema = schema({
  id: String,
  name: String,
  bodyPart: String,
  equipmentUsed: String,
  image: String,
  liked: { type: Boolean, default: false },
});

module.exports = exercicesSchema;
