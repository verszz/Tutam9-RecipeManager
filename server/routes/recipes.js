const express = require('express');
const {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require('../models/recipe');

const router = express.Router();

router.get('/', async (req, res) => {
  const recipes = await getAllRecipes();
  res.json(recipes);
});

router.get('/:id', async (req, res) => {
  const recipe = await getRecipeById(req.params.id);
  res.json(recipe);
});

router.post('/', async (req, res) => {
  const { title, ingredients, description, instructions, image_url } = req.body;
  const newRecipe = await createRecipe(title, description, ingredients, instructions, image_url);
  res.json(newRecipe);
});

router.put('/:id', async (req, res) => {
  const { title, description, ingredients, instructions, image_url } = req.body;
  const updatedRecipe = await updateRecipe(req.params.id, title, description, ingredients, instructions, image_url);
  res.json(updatedRecipe);
});

router.delete('/:id', async (req, res) => {
  await deleteRecipe(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
