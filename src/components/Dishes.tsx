import React from "react";

const dishes = [
  { name: "Grilled Chicken", image: "/src/assets/grilled-chicken.jpg" },
  { name: "Tomato & Cheese Salad", image: "/src/assets/tomato-cheese-salad.jpg" },
  { name: "Rice with Vegetables", image: "/src/assets/rice-vegetables.jpg" },
  { name: "Potato Soup", image: "/src/assets/potato-soup.jpg" },
  { name: "Lemon Chicken", image: "/src/assets/lemon-chicken.jpg" },
  { name: "Cheese Omelette", image: "/src/assets/cheese-omelette.jpg" },
];

const Dishes = () => {
  return (
    <div className="bg-white p-6 shadow-md rounded-lg absolute left-[32%] bottom-[4%] right-0 w-2/3 h-[30%] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Available Recipes</h2>
      <ul className="grid grid-cols-3 gap-2 h-full">
        {dishes.map((dish) => (
          <li key={dish.name} className="p-2 bg-gray-100 rounded-md text-center">
            <img src={dish.image} alt={dish.name} className="w-full h-5 object-cover rounded-md mb-4" />
            {dish.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dishes;