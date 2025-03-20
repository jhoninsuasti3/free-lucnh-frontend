import { useState } from "react";

interface OrderButtonProps {
  placeOrder: () => void;
}

const OrderButton: React.FC<OrderButtonProps> = ({ placeOrder }) => {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrder = async () => {
    setLoading(true);
    setError(null);

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
      setOrderId(data.orderId); // Guardar el orderId en el estado
      placeOrder(); // Llamar la función pasada desde Dashboard.tsx
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error("Error creating order:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
        onClick={handleOrder}
        disabled={loading}
      >
        {loading ? "Ordering..." : "Order Random Dish"}
      </button>

      {/* MODAL MEJORADO: FONDO TRANSPARENTE Y BLUR MÁS SUAVE */}
      {orderId && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 backdrop-blur-md z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-300 w-1/3 text-center">
            <h2 className="text-xl font-bold mb-4">✅ Order Created Successfully!</h2>
            <p className="text-gray-700">Your Order ID:</p>
            <p className="text-blue-600 font-bold text-lg">{orderId}</p>
            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full"
              onClick={() => setOrderId(null)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* MENSAJE DE ERROR */}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
};

export default OrderButton;
