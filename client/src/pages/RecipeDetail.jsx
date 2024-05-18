import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/recipes/${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data));
  }, [id]);

  if (!recipe) {
    return (
      <div className="flex">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <img
            src={recipe.image_url}
            alt={recipe.title}
            className="w-full h-auto object-cover rounded-lg"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.title}</h1>
            <p className="text-lg text-gray-700 mb-4">{recipe.description}</p>
            <RecipeDetails recipe={recipe} />
            <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block hover:bg-blue-600 transition duration-300 ease-in-out">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeDetails({ recipe }) {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ingredients</h3>
      <ul className="mt-2 text-gray-700 list-disc pl-5 space-y-1">
        {recipe.ingredients.split(',').filter(ingredient => ingredient.trim().length > 0).map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">Instructions</h3>
      <ol className="mt-2 text-gray-700 list-decimal pl-5 space-y-1">
        {recipe.instructions.split('.').filter(instr => instr.trim().length > 0).map((instruction, index) => (
          <li key={index}>{instruction.trim()}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetail;