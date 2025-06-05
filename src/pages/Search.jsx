import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './search.css'

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const navigate = useNavigate();

  useEffect(() =>{
    fetchTrendingRecipes();
  }, []);

const fetchTrendingRecipes = async ()=>{
  const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=chicken`);
  const data=await response.json();
  setRecipes(data.meals || []);
};

const handleSearch = async ()=>{
  const response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
  const data=await response.json();
  setRecipes(data.meals || []);
  setShowFavorites(false);
};

const displayedRecipes = showFavorites ? favorites : recipes;

const goToRecipe=(id)=>{
  navigate(`/recipe/${id}`)
};


  return (
    <div>
      <h1>Search for Recipes</h1>
      <input type="text" id="textbox" style={{color:"black"}} placeholder='Enter food item' value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)}
      />
       <button  id="searchbtn" onClick={handleSearch}>Search</button>
      <button id="viewfav" onClick={() => setShowFavorites(!showFavorites)}>
        {showFavorites ? "🔍 View All" : "❤️ View Favorites"}
      </button>
      <h2 style={{ color: "Black",fontSize:40 }}> {!searchTerm && !showFavorites ? "Trending Recipes" : ""}</h2>


     
      <div className="recipe-list" >
        {recipes.slice(0,12).map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card" onClick={()=>goToRecipe(recipe.idMeal)}>
            <h3>{recipe.strMeal}</h3>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} width={200}/>
            
            
          </div>
        ))}
      </div>
    </div>
   
  );
  console.log("Favorites:", favorites);
}

export default SearchPage;
