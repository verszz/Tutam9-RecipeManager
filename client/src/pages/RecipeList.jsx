import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(6);
  

  useEffect(() => {
    fetch('http://localhost:5000/recipes')
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/recipes/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    });
  };

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="container mx-auto p-4 relative" style={{ marginTop: '80px' }}>
        <h1 className="text-3xl font-bold mb-4">Recipes List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentRecipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
              <div
                className="bg-white border rounded-lg overflow-hidden shadow-lg transition-transform transition-shadow duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl h-full" 
              >
                {recipe.image_url && (
                  <img src={recipe.image_url} alt={recipe.title} className="w-full h-50 object-cover" />
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-black">{recipe.title}</h2>
                  <h3 className="text-l text-black">{recipe.description}</h3>
                  <h3 className="text-l pt-5 text-black">Ingredients</h3>
                  <ul className="mt-2 text-gray-600 list-disc pl-5">
                    {recipe.ingredients.split(',').filter((ingredient, index) => index < 8 && ingredient.trim().length > 0).map((ingredient, index) => (
                      <li key={index}>{ingredient.trim()}</li>
                    ))}
                    {recipe.ingredients.split(',').length > 8 && (
                      <li>...</li>
                    )}
                  </ul>
                  <div className="flex mt-4 justify-between">
                    <Link to={`/edit/${recipe.id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(recipe.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center items-center">
  <ul className="flex">
    <li className="mr-3">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`bg-gray-200 text-black px-4 py-2 rounded-l focus:outline-none ${
          currentPage === 1 && 'cursor-not-allowed bg-slate-600'
        }`}
      >
        Previous
      </button>
    </li>
    {filteredRecipes.length > recipesPerPage && (
      <li className="mr-3">
        {[...Array(Math.ceil(filteredRecipes.length / recipesPerPage)).keys()].map((pageNumber) => (
          <span
            key={pageNumber}
            onClick={() => paginate(pageNumber + 1)}
            className={`cursor-pointer px-4 py-2 mx-1 bg-gray-200 rounded text-black hover:bg-gray-300 ${
              pageNumber + 1 === currentPage ? 'bg-gray-600' : 'hover:bg-gray-300'
            }`}
          >
            {pageNumber + 1}
          </span>
        ))}
      </li>
    )}
    <li>
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={indexOfLastRecipe >= filteredRecipes.length}
        className={`bg-gray-200 text-black px-4 py-2 rounded-r focus:outline-none ${
          indexOfLastRecipe >= filteredRecipes.length && 'cursor-not-allowed bg-slate-600'
        }`}
      >
        Next
      </button>
    </li>
  </ul>
</div>

        <Link to="/new" className="bg-green-500 text-white px-4 py-2 rounded fixed bottom-4 right-4 hover:bg-green-600 focus:outline-none focus:shadow-outline">
          Add New Recipe
        </Link>
      </div>
    </div>
  );
}

export default RecipeList;
