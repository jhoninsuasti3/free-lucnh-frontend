import OrderButton from "../components/OrderButton";
import OrderHistory from "../components/OrderHistory";
import { Dishes } from "../components/Dishes";
import KitchenPanel from "../components/KitchenPanel";

const Dashboard = () => {
  const placeOrder = () => {
    alert("Random dish ordered!");
  };

  return (
    <div className="p-6 grid grid-cols-3 gap-4 h-screen">
      {/* Orders Section (Left) - 40% width, 100% height */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md h-full col-span-1 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-4">Orders</h2>
        <OrderButton placeOrder={placeOrder} />
        <OrderHistory />
      </div>

      {/* Kitchen Panel & Recipes (Right) */}
      <div className="col-span-2 flex flex-col h-full">
        {/* Kitchen Panel - 60% Height */}
        <div className="bg-white p-6 shadow-md rounded-lg h-[60%] mb-4">
          <KitchenPanel />
        </div>

        {/* Recipes - 40% Height */}
        <div className="bg-white p-6 shadow-md rounded-lg h-[40%]">
          <Dishes />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
