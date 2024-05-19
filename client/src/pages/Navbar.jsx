import React from 'react';

function Navbar({ searchQuery, setSearchQuery }) {
  return (
    <nav className="bg-blue-500 p-0 shadow-md w-full fixed top-0 left-0 z-50 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-4xl font-bold pt-4">Food Recipes</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Recipe..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-700"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
