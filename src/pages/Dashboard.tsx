// src/pages/Dashboard.tsx
import OrderButton from "../components/OrderButton";
import OrderHistory from "../components/OrderHistory";
import Dishes from "../components/Dishes";
import KitchenPanel from "../components/KitchenPanel";

const Dashboard = () => {
  const placeOrder = () => {
    alert("Random dish ordered!");
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4 min-h-screen relative">
      {/* Orders Section - Left Side (Fixed Height) */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md col-span-1 flex flex-col justify-between" style={{ marginLeft:"2vh" ,marginRight:"5vh" ,height: "92vh" }}>
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <OrderButton placeOrder={placeOrder} />
        <OrderHistory />
      </div>
      
      {/* Kitchen Dashboard - Right Side, Fixed Height */}
      <div className="col-span-2" style={{ height: "60vh", marginTop: "0.5vh" }}>
        <KitchenPanel />
      </div>

      {/* Recipes Panel - Positioned Below Kitchen Panel */}
      <div className="col-span-2" style={{ marginLeft: "52vh", height: "1vh" }}>
      <Dishes />      </div>
      
    </div>
  );
};

export default Dashboard;