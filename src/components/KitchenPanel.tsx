import { useState } from "react";
import IngredientsInventory from "./IngredientsInventory";
import Preparations from "./Preparations";
import Purchases from "./Purchases";

const KitchenPanel = () => {
  const [activeTab, setActiveTab] = useState("preparations");

  return (
    <div className="bg-white p-6 shadow-md rounded-lg h-[60vh] overflow-hidden">
    <h2 className="text-lg font-bold mb-4">Kitchen Management</h2>
          
      {/* Botones de navegación */}
      <div className="flex space-x-4 mb-4">
        <button 
          onClick={() => setActiveTab("preparations")} 
          className={`px-4 py-2 rounded-md ${activeTab === "preparations" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Preparations
        </button>
        <button 
          onClick={() => setActiveTab("ingredients")} 
          className={`px-4 py-2 rounded-md ${activeTab === "ingredients" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Ingredients
        </button>
        <button 
          onClick={() => setActiveTab("purchases")} 
          className={`px-4 py-2 rounded-md ${activeTab === "purchases" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          Purchases
        </button>
      </div>

      {/* Contenido de cada pestaña con altura fija y scroll interno */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "preparations" && <Preparations />}
        {activeTab === "ingredients" && <IngredientsInventory />}
        {activeTab === "purchases" && <Purchases />}
      </div>
    </div>
  );
};

export default KitchenPanel;
