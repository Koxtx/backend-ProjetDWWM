const schema = require("mongoose").Schema;

const exercicesSchema = schema({
  name: String,
  description: String,
  muscles: [String],
});

module.exports = exercicesSchema;
