const pool = require('../db');

const getAllRecipes = async () => {
  const result = await pool.query('SELECT * FROM recipes ORDER BY id ASC');
  return result.rows;
};

const getRecipeById = async (id) => {
  const result = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
  return result.rows[0];
};

const createRecipe = async (title, description, ingredients, instructions, imageUrl) => {
  const result = await pool.query(
    'INSERT INTO recipes (title, description, ingredients, instructions, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, description, ingredients, instructions, imageUrl]
  );
  return result.rows[0];
};

const updateRecipe = async (id, title, description, ingredients, instructions, imageUrl) => {
  const result = await pool.query(
    'UPDATE recipes SET title = $1, description = $2, ingredients = $3, instructions = $4, image_url = $5 WHERE id = $6 RETURNING *',
    [title, description, ingredients, instructions, imageUrl, id]
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
