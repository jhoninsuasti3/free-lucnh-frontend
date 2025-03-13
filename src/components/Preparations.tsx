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

const Preparations = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  useEffect(() => {
    fetch("https://8oxe6sxwj4.execute-api.us-east-1.amazonaws.com/prod/orders", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then((response) => response.json())
      .then((data: Order[]) => {
        setOrders(data);
        setFilteredOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Filtrar por estado y fecha de creación
  useEffect(() => {
    let filtered = orders;

    if (statusFilter) {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter(order => order.createdAt.startsWith(dateFilter));
    }

    setFilteredOrders(filtered);
  }, [statusFilter, dateFilter, orders]);

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading orders...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Preparations</h2>
      
      {/* Filtros */}
      <div className="flex space-x-4 mb-4">
        {/* Filtro de estado */}
        <select
          className="p-2 border rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="pendiente">Pending</option>
          <option value="finalizada">Completed</option>
          <option value="canceled">Canceled</option>
        </select>

        {/* Filtro de fecha */}
        <input
          type="date"
          className="p-2 border rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Lista de órdenes */}
      <ul className="space-y-4">
        {filteredOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          filteredOrders.map((order) => (
            <li key={order.orderId} className="p-4 bg-gray-100 rounded-md border border-gray-300">
              <p className="font-bold">Order ID: <span className="font-normal">{order.orderId}</span></p>
              <p className="font-bold">Recipe ID: <span className="font-normal">{order.recipeId}</span></p>
              
              {/* STATUS con colores */}
              <p className="font-bold">Status: 
                <span className={`ml-2 px-2 py-1 rounded-md text-white ${order.status === "pending" ? "bg-yellow-500" : order.status === "finalizada" ? "bg-green-500" : "bg-red-500"}`}>
                  {order.status}
                </span>
              </p>

              <p className="font-bold">Created At: <span className="font-normal">{new Date(order.createdAt).toLocaleString()}</span></p>
              <p className="font-bold">Updated At: <span className="font-normal">{new Date(order.updatedAt).toLocaleString()}</span></p>

              {/* INGREDIENTES */}
              <p className="font-bold">Ingredients:</p>
              <ul className="ml-4 list-disc">
                {order.ingredients.map((ingredient) => (
                  <li key={ingredient.name} className="text-gray-700">
                    {ingredient.name} - {ingredient.quantity} units
                  </li>
                ))}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Preparations;
