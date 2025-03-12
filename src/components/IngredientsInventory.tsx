import { useEffect, useState } from "react";

interface Ingredient {
  name: string;
  quantity: number;
}

const IngredientsInventory = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/ingredients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then((response) => response.json())
      .then((data: Ingredient[]) => {
        setIngredients(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading ingredients...</div>;
  }

  return (
    <div className="bg-white p-4 shadow-md rounded-lg overflow-y-auto max-h-[250px]"> {/* Limitamos el tamaño */}
      <h2 className="text-lg font-bold mb-4">Inventory of Warehouse</h2>
      <ul className="grid grid-cols-3 gap-2">
        {ingredients.map((ingredient) => (
          <li key={ingredient.name} className="p-2 bg-gray-100 rounded-md text-center border border-gray-300"> {/* Agregamos bordes */}
            {ingredient.name} - {ingredient.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsInventory;
