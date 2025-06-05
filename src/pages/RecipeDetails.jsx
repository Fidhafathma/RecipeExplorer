import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './search.css'

function RecipeDetails({ favorites, setFavorites }) {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      setRecipe(data.meals ? data.meals[0] : null);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
      setRecipe(null);
    }
  };

  const isFavorite = favorites.some((item) => item.idMeal === recipe?.idMeal);

  const addToFavorites = () => {
    if (!isFavorite) {
      setFavorites([...favorites, recipe]);
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="body" style={{ padding: '20px' }}>
      <button
        onClick={addToFavorites}
        disabled={isFavorite}
        style={{ backgroundColor: isFavorite ? "gray" : "green", marginLeft: 600, color: "white", padding: "10px 20px", border: "none", cursor: isFavorite ? "default" : "pointer" }}
      >
        {isFavorite ? "Added to Favorites" : "+ Add to Favorite"}
      </button>

      <h1>{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} width={200} />
      <p><strong>Category:</strong> {recipe.strCategory}</p>
      <p><strong>Area:</strong> {recipe.strArea}</p>
      <p style={{ maxWidth: '800px' }}>{recipe.strInstructions}</p>
    </div>
  );
}

export default RecipeDetails;
