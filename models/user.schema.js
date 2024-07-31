const mongoose = require("mongoose");

const schema = require("mongoose").Schema;

const userSchema = schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: String,
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
