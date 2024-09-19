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
    let url = "https://wger.de/api/v2/exercise/?format=json&language=2";
    while (url) {
      const response = await fetch(url);
      const data = await response.json();

      for (const exercise of data.results) {
        // Vérifier si l'exercice est bien en français
        if (exercise.language.id === 2) {
          const primaryMuscle = exercise.category
            ? exercise.category.name
            : "Inconnu";

          const newExercise = new Exercise({
            name: exercise.name,
            description: exercise.description || "Description non disponible",
            primaryMuscle,
            secondaryMuscles: exercise.muscles_secondary.map((m) => m.name),
            equipment:
              exercise.equipment.length > 0
                ? exercise.equipment[0].name
                : "Aucun",
            imageUrl: exercise.image,
          });

          await newExercise.save();
        }
      }
      url = data.next; // Passe à la page suivante
    }
    console.log("Exercices importés avec succès");
  } catch (error) {
    console.error("Erreur lors de l'importation des exercices : ", error);
  }
}






async function importIngredients() {
  try {
    const response = await fetch(
      "https://wger.de/api/v2/ingredient/?format=json&language=2"
    );
    const data = await response.json();

    for (const ingredient of data.results) {
      // On suppose que l'API renvoie les ingrédients en français avec le paramètre language=2
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
