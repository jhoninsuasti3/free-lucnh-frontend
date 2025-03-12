import { useState } from "react";
import OrderButton from "../components/OrderButton";
import OrderHistory from "../components/OrderHistory";
import { Dishes } from "../components/Dishes";
import KitchenPanel from "../components/KitchenPanel";

const Dashboard = () => {
  const [refreshOrders, setRefreshOrders] = useState(false);

  const handleOrderCreated = () => {
    setRefreshOrders((prev) => !prev); // 🔄 Forzar actualización del historial
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4 min-h-screen relative">
      {/* Orders Section - Left Side (Fixed Height) */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 flex flex-col justify-between" style={{ height: "80vh" }}>
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <OrderButton onOrderCreated={handleOrderCreated} />
        <OrderHistory refresh={refreshOrders} />
      </div>

      {/* Kitchen Dashboard - Right Side, Fixed Height */}
      <div className="col-span-2" style={{ height: "60vh", marginTop: "5vh" }}>
        <KitchenPanel />
      </div>

      {/* Recipes Panel - Positioned Below Kitchen Panel */}
      <Dishes />
    </div>
  );
};

export default Dashboard;
