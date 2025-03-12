import { useEffect, useState } from "react";

interface Ingredient {
  name: string;
  quantity: number;
}

const IngredientsInventory = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/ingredients")
      .then((response) => response.json())
      .then((data: Ingredient[]) => {  // ⬅️ Asegurar que TypeScript sepa el tipo de datos
        setIngredients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-4 bg-white shadow-md rounded-lg">Loading ingredients...</div>;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg border border-gray-300 h-48 overflow-y-auto">
      <h2 className="text-md font-semibold mb-2">Inventory of Warehouse</h2>
      <ul className="grid grid-cols-2 gap-1 text-sm">
        {ingredients.map((ingredient) => (
          <li key={ingredient.name} className="p-2 bg-gray-100 rounded-md border border-gray-200 text-center">
            {ingredient.name} - {ingredient.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsInventory;
