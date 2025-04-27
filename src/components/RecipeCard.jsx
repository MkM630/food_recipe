function RecipeCard({ meal, onClick }) {
  return (
    <div className="recipe-card" onClick={() => onClick(meal)}>
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
      <p>{meal.strInstructions.substring(0, 100)}...</p>
    </div>
  );
}

export default RecipeCard;
