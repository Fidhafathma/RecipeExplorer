import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './search.css'
function RecipeDetails({ favorites, setFavorites }) {
  const [recipe, setRecipe] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.meals[0]);
  };

  const addToFavorites = () => {
    const alreadyAdded = favorites.some((item) => item.idMeal === recipe.idMeal);
    if (!alreadyAdded) {
      setFavorites([...favorites, recipe]);
      alert("Added to favorites!");
    } else {
      alert("Already in favorites!");
    }
    
  };

    if (!recipe) return <div>Loading...</div>;

  return (
    <div className="body" style={{ padding: '20px' }}>
      {recipe ? (
        <>
          <button onClick={()=>addToFavorites(recipe)} style={{backgroundColor:"green",marginLeft:600}}>+ Add to Favorate</button>
          <h1>{recipe.strMeal}</h1>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} width={200} />
          <p><strong>Category:</strong> {recipe.strCategory}</p>
          <p><strong>Area:</strong> {recipe.strArea}</p>
          <p style={{ maxWidth: '800px' }}>{recipe.strInstructions}</p>
        </>
      ) : (
        <p>Loading Recipe...</p>
      )}
    </div>
  );
}

export default RecipeDetails;
