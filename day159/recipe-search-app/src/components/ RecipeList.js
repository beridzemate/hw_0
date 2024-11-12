import React from 'react';
import RecipeItem from './RecipeItem';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;
