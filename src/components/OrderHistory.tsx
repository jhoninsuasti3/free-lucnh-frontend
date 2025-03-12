import { useEffect, useState } from "react";

const OrderHistory = ({ refresh }: { refresh: boolean }) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://8oxe6sxwj4.execute-api.us-east-1.amazonaws.com/prod/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("❌ Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [refresh]); // 🔄 Se vuelve a cargar cuando `refresh` cambia

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading orders...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Order History</h2>
      <div className="h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
        <ul className="space-y-2">
          {orders.map((order) => (
            <li key={order.orderId} className="p-2 bg-gray-100 rounded-md text-center">
              Order ID: {order.orderId} | Status: {order.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderHistory;
