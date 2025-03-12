import { useEffect, useState } from "react";

const IngredientsInventory = () => {
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/ingredients")
      .then((response) => response.json())
      .then((data) => {
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
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Inventory of Warehouse</h2>
      <ul className="grid grid-cols-2 gap-2">
        {ingredients.map((ingredient) => (
          <li key={ingredient.name} className="p-2 bg-gray-100 rounded-md text-center">
            {ingredient.name} - {ingredient.quantity} units
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsInventory;