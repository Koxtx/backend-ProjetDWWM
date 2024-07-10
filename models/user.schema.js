const mongoose = require("mongoose");

const schema = require("mongoose").Schema;

const userSchema = schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String,
    favorites: {
      exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: "Exercice" }],
      recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recette" }],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
