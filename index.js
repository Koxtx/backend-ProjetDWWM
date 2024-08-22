const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const fetch = require("node-fetch");
const Exercise = require("./models/exercice.schema");
const Ingredient = require("./models/ingredients.schema");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware pour loguer les requêtes

const routes = require("./routes");
app.use(routes);
async function importExercises() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/exercise/?format=json"
    );
    const data = await response.json();

    for (const exercise of data.results) {
      if (!exercise.category || !exercise.category.name) {
        console.warn(
          `Skipping exercise ${exercise.name}: primaryMuscle is missing`
        );
        continue; // Passez cet exercice s'il manque des données cruciales
      }

      const newExercise = new Exercise({
        name: exercise.name,
        description: exercise.description || "No description available",
        primaryMuscle: exercise.category.name, // Assurez-vous que ce champ existe
        equipment:
          exercise.equipment.length > 0 ? exercise.equipment[0].name : "None",
        imageUrl: exercise.image,
      });
      await newExercise.save();
    }
    console.log("Exercices importés avec succès");
  } catch (error) {
    console.error("Erreur lors de l'importation des exercices : ", error);
  }
}

async function importIngredients() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/ingredient/?format=json"
    );
    const data = await response.json();

    for (const ingredient of data.results) {
      const newIngredient = new Ingredient({
        name: ingredient.name,
        calories: ingredient.energy, // calories
        protein: ingredient.protein,
        carbs: ingredient.carbohydrates,
        fat: ingredient.fat,
      });
      await newIngredient.save();
    }
    console.log("Ingrédients importés avec succès");
  } catch (error) {
    console.error("Erreur lors de l'importation des ingrédients : ", error);
  }
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    () => console.log("Connection mongoDB ok"),
    importExercises(),
    importIngredients()
  )
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
