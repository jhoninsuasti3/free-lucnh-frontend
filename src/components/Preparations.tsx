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
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading orders...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-h-[300px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Preparations</h2>
      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.orderId} className="p-4 bg-gray-100 rounded-md border border-gray-300">
            <p className="font-bold">Order ID: <span className="font-normal">{order.orderId}</span></p>
            <p className="font-bold">Recipe ID: <span className="font-normal">{order.recipeId}</span></p>
            <p className="font-bold">Status: <span className="font-normal">{order.status}</span></p>
            <p className="font-bold">Created At: <span className="font-normal">{new Date(order.createdAt).toLocaleString()}</span></p>
            <p className="font-bold">Updated At: <span className="font-normal">{new Date(order.updatedAt).toLocaleString()}</span></p>
            <p className="font-bold">Ingredients:</p>
            <ul className="ml-4 list-disc">
              {order.ingredients.map((ingredient) => (
                <li key={ingredient.name} className="text-gray-700">
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

export default Preparations;
