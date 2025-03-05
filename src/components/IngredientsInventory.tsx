
const ingredients = [
  "Tomato", "Lemon", "Potato", "Rice", "Ketchup",
  "Lettuce", "Onion", "Cheese", "Meat", "Chicken"
];

const IngredientsInventory = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Inventory of Warehouse</h2>
      <ul className="grid grid-cols-2 gap-2">
        {ingredients.map((ingredient) => (
          <li key={ingredient} className="p-2 bg-gray-100 rounded-md text-center">
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsInventory;