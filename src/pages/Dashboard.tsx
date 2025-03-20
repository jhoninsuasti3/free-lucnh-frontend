// src/pages/Dashboard.tsx
import OrderButton from "../components/OrderButton";
import OrderHistory from "../components/OrderHistory";
import { Dishes } from "../components/Dishes";
import KitchenPanel from "../components/KitchenPanel";

const Dashboard: React.FC = () => {
  const placeOrder = () => {
    alert("Random dish ordered!");
  };

  return (
<div className="grid grid-cols-3 gap-4 min-h-screen">
  {/* 🟦 Orders - Panel Izquierdo */}
  <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 flex flex-col justify-between h-screen">
    <h2 className="text-xl font-bold mb-4">Orders</h2>
    <OrderButton placeOrder={placeOrder} />
    <OrderHistory refresh={true} />
  </div>

  {/* 📌 Kitchen Panel + Recipes (Parte Derecha) */}
  <div className="col-span-2 flex flex-col gap-4">
    {/* 🟧 Kitchen Panel - Arriba */}
    <div className="flex flex-col justify-between">
    <KitchenPanel />
    </div>

    {/* 🍽 Recipes - Abajo */}
    <div className="bg-white p-6 shadow-md rounded-lg h-[35vh] overflow-y-auto">
      <Dishes />
    </div>
  </div>
</div>

  );
};

export default Dashboard;
