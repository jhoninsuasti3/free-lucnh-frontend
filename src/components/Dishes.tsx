// src/components/Dishes.tsx
import  { useEffect, useState } from "react";

const Dishes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors" // Permite solicitudes CORS en navegadores
    })
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading recipes...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg mt-6">
      <h2 className="text-lg font-bold mb-4">Available Recipes</h2>
      <ul className="grid grid-cols-3 gap-2">
        {recipes.map((recipe) => (
          <li key={recipe.recipeId} className="p-2 bg-gray-100 rounded-md text-center">
            <img src={recipe.image} alt={recipe.name} className="w-32 h-20 object-cover rounded-md mb-2" />
            {recipe.name}
          </li>
        ))}
      </ul>
    </div>
  );  
};

export { Dishes };