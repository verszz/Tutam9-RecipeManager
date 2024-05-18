const pool = require('../db');

const getAllRecipes = async () => {
  const result = await pool.query('SELECT * FROM recipes ORDER BY id ASC');
  return result.rows;
};

const getRecipeById = async (id) => {
  const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return result.rows[0];
};

const createRecipe = async (title, ingredients, instructions, imageUrl) => {
  const result = await pool.query(
    'INSERT INTO recipes (title, ingredients, instructions, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, ingredients, instructions, imageUrl]
  );
  return result.rows[0];
};

const updateRecipe = async (id, title, ingredients, instructions, imageUrl) => {
  const result = await pool.query(
    'UPDATE recipes SET title = $1, ingredients = $2, instructions = $3, image_url = $4 WHERE id = $5 RETURNING *',
    [title, ingredients, instructions, imageUrl, id]
  );
  return result.rows[0];
};

const deleteRecipe = async (id) => {
  await pool.query('DELETE FROM recipes WHERE id = $1', [id]);
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
