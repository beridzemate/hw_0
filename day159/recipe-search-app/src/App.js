import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = (query) => {
    setLoading(true);
    setError(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
          setError("No recipes found for this ingredient.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch recipes. Try again later.');
        setLoading(false);
      });
  };

  return (
    <div className="app">
      <h1>Recipe Search App</h1>
      

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
        <g fill="none" stroke="#61dafb" stroke-width="11" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="64" cy="64" r="56"/>
          <ellipse cx="64" cy="64" rx="28" ry="56"/>
          <ellipse cx="64" cy="64" rx="56" ry="28"/>
        </g>
      </svg>

      <SearchBar onSearch={fetchRecipes} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;
