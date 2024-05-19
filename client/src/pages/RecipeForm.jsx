import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [formMode, setFormMode] = useState('Add'); 

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/recipes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setTitle(data.title);
          setDescription(data.description);
          setIngredients(data.ingredients);
          setInstructions(data.instructions);
          setImageUrl(data.image_url);
        });
      setFormMode('Edit'); 
    }
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const url = id ? `http://localhost:5000/recipes/${id}` : 'http://localhost:5000/recipes';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, ingredients, instructions, image_url: imageUrl }),
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{formMode === 'Add' ? 'Add Recipe' : 'Edit Recipe'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-5 rounded-lg shadow-md max-w-lg mx-auto" style={{ marginLeft: '50px', marginRight: '300px', width: '100%' }}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Food</label>
          <input
            type="text"
            style={{ backgroundColor: 'lightblue', border: '2px solid blue', padding: '8px' }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            style={{ backgroundColor: 'lightblue', border: '2px solid blue', padding: '8px' }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Ingredients</label>
          <textarea
            style={{ backgroundColor: 'lightblue', border: '2px solid blue', padding: '8px' }}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Instructions</label>
          <textarea
            style={{ backgroundColor: 'lightblue', border: '2px solid blue', padding: '8px' }}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="text"
            style={{ backgroundColor: 'lightblue', border: '2px solid blue', padding: '8px' }}
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex justify-between">
          <Link to="/" className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline">
            Back to List
          </Link>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline">
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
}

export default RecipeForm;
