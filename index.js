require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());

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
