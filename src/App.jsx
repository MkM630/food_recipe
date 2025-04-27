import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/RecipeCard';

function App() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const searchRecipes = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await res.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (meal) => {
    setSelectedRecipe(meal);
  };

  const handleCloseDetails = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="App">
      <header>
        <h1>TastyFind 🍴</h1>
      </header>

      <SearchBar query={query} setQuery={setQuery} searchRecipes={searchRecipes} />

      {loading ? (
        <p>Loading recipes...</p>
      ) : selectedRecipe ? (
        <div className="recipe-details">
          <button className="close-btn" onClick={handleCloseDetails}>Close</button>
          <h2>{selectedRecipe.strMeal}</h2>

          <div className='pic_me'>
          <img src={selectedRecipe.strMealThumb} alt={selectedRecipe.strMeal} />
          <div> <h3 className='ing'>Ingredients:</h3>
          <ul>
            {Array.from({ length: 20 }).map((_, i) => {
              const ingredient = selectedRecipe[`strIngredient${i + 1}`];
              const measure = selectedRecipe[`strMeasure${i + 1}`];
              return ingredient && ingredient.trim() ? (
                <li key={i}>{`${ingredient} - ${measure}`}</li>
              ) : null;
            })}
          </ul></div>
          
          </div>
          
          <h3 className='ins'>Instructions:</h3>
          <p>{selectedRecipe.strInstructions}</p>
        </div>
      ) : (
        <div className="recipes-container">
          {recipes.length > 0 ? (
            recipes.map((meal) => (
              <RecipeCard key={meal.idMeal} meal={meal} onClick={handleCardClick} />
            ))
          ) : (
            <p>No recipes found. Try searching something else!</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
