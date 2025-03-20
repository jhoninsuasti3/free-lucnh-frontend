import { useEffect, useState } from "react";

const Dishes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/recipes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
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
    <div className="bg-white p-6 shadow-md rounded-lg mt-6 w-full h-[40vh] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Available Recipes</h2>
      
      {/* GRID PARA RECETAS */}
      <ul className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.recipeId} className="p-4 bg-gray-100 rounded-md shadow-md flex flex-col items-center text-center">
            
            {/* ID DE LA RECETA */}
            <p className="text-sm text-gray-500">Recipe ID: <span className="font-semibold">{recipe.recipeId}</span></p>
            
            {/* IMAGEN DE LA RECETA */}
            <img src={recipe.image} alt={recipe.name} className="w-40 h-24 object-cover rounded-md mb-2" />
            
            {/* NOMBRE DE LA RECETA */}
            <p className="text-lg font-bold">{recipe.name}</p>

            {/* INGREDIENTES */}
            <ul className="mt-2 text-sm text-gray-700">
              {recipe.ingredients.map((ingredient: any, index: number) => (
                <li key={index} className="border-b border-gray-300 py-1">
                  {ingredient.name} - {ingredient.quantity} units
                </li>
              ))}
            </ul>

          </li>
        ))}
      </ul>
    </div>
  );
};

export { Dishes };
