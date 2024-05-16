require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const routes = require("./routes");
app.use(routes);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conncetion mongoDB ok");
  })
  .catch((err) => console.log(err));

app.post(`APP listening on port ${PORT} `);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
