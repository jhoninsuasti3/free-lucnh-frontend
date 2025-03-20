import { useEffect, useState } from "react";

interface Recipe {
  recipeId: string;
  name: string;
  image: string;
  ingredients: { name: string; quantity: number }[];
}

const Dishes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/recipes", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
    <div className="bg-white p-6 shadow-md rounded-lg w-full mt-6">
      <h2 className="text-lg font-bold mb-4">Available Recipes</h2>
      <ul className="grid grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.recipeId} className="p-4 bg-gray-100 rounded-md text-center">
            <img src={recipe.image} alt={recipe.name} className="w-40 h-28 object-cover rounded-md mb-2" />
            <p className="font-bold">{recipe.name}</p>
            <p className="text-sm text-gray-500">Recipe ID: {recipe.recipeId}</p>
            <ul className="text-xs text-gray-700 mt-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.name}>
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
