import { useState } from "react";

const OrderButton = ({ onOrderCreated }: { onOrderCreated: () => void }) => {
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://8oxe6sxwj4.execute-api.us-east-1.amazonaws.com/prod/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const data = await response.json();
      if (data.status === "pending") {
        alert("✅ Order successfully created!");
        onOrderCreated(); // 🔄 Notificar a `OrderHistory` que hay una nueva orden
      } else {
        alert("⚠️ Order created but not in pending state.");
      }
    } catch (error) {
      console.error("❌ Error creating order:", error);
      alert("Failed to create order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
      onClick={placeOrder}
      disabled={loading}
    >
      {loading ? "Ordering..." : "Order Random Dish"}
    </button>
  );
};

export default OrderButton;
