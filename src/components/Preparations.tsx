import { useEffect, useState } from "react";

interface Ingredient {
  name: string;
  quantity: number;
}

interface Order {
  orderId: string;
  recipeId: string;
  ingredients: Ingredient[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Recipe {
  recipeId: string;
  name: string;
}

const Preparations = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  // Cargar órdenes
  useEffect(() => {
    fetch("https://8oxe6sxwj4.execute-api.us-east-1.amazonaws.com/prod/orders", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data: Order[]) => {
        setOrders(data);
        setFilteredOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));

    // Cargar recetas
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/recipes")
      .then((response) => response.json())
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error))
      .finally(() => setLoading(false));
  }, []);

  // Filtrar por estado y fecha
  useEffect(() => {
    let filtered = orders;
    if (statusFilter) filtered = filtered.filter((order) => order.status === statusFilter);
    if (dateFilter) filtered = filtered.filter((order) => order.createdAt.startsWith(dateFilter));
    setFilteredOrders(filtered);
  }, [statusFilter, dateFilter, orders]);

  // Obtener el nombre de la receta basado en el recipeId
  const getRecipeName = (recipeId: string) => {
    const recipe = recipes.find((r) => r.recipeId === recipeId);
    return recipe ? recipe.name : "Unknown Recipe";
  };

  if (loading) return <div className="p-6 bg-white shadow-md rounded-lg">Loading orders...</div>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-h-[400px] overflow-y-auto text-xs">
      <h2 className="text-lg font-bold mb-4">Preparations</h2>

      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        <select className="p-2 border rounded-md" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="finalizada">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
        <input type="date" className="p-2 border rounded-md" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} />
      </div>

      {/* Lista de órdenes */}
      <ul className="space-y-4">
        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <li key={order.orderId} className="p-4 bg-gray-100 rounded-md border border-gray-300 flex justify-between">
              {/* Información de la orden */}
              <div className="w-1/2">
                <p className="font-bold">Order ID: <span className="font-normal">{order.orderId}</span></p>
                <p className="font-bold">Recipe: <span className="font-normal">{getRecipeName(order.recipeId)}</span></p>

                {/* STATUS con colores */}
                <p className="font-bold">
                  Status: 
                  <span className={`ml-2 px-2  rounded-md text-white ${order.status === "pending" ? "bg-yellow-500" : order.status === "finalizada" ? "bg-green-500" : "bg-red-500"}`}>
                    {order.status}
                  </span>
                </p>

                <p className="font-bold">Created At: <span className="font-normal">{new Date(order.createdAt).toLocaleString()}</span></p>
                <p className="font-bold">Updated At: <span className="font-normal">{new Date(order.updatedAt).toLocaleString()}</span></p>
              </div>

              {/* Ingredientes alineados a la derecha */}
              <div className="w-1/2 text-right">
                <p className="font-bold">Ingredients Used:</p>
                <ul className="list-none">
                  {order.ingredients.map((ing) => (
                    <li key={ing.name} className="text-gray-700">{ing.name} - {ing.quantity} units</li>
                  ))}
                </ul>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Preparations;
