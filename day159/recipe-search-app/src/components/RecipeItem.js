import React from 'react';

const RecipeItem = ({ recipe }) => {
  return (
    <div className="recipe-item">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <p>{recipe.summary ? recipe.summary.slice(0, 100) + '...' : 'No description available.'}</p>
      <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
        View Full Recipe
      </a>
    </div>
  );
};

export default RecipeItem;
