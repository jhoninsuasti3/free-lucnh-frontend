import { useEffect, useState } from "react";

interface Ingredient {
  name: string;
  requestedQuantity: number;
  quantitySold: number;
}

interface Purchase {
  purchaseId: string;
  orderId: string;
  ingredients: Ingredient[];
  createdAt: string;
}

const Purchases = () => {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<string>("");

  useEffect(() => {
    fetch("https://83y77mqbrl.execute-api.us-east-1.amazonaws.com/prod/purchases", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "cors"
    })
      .then((response) => response.json())
      .then((data: Purchase[]) => {
        setPurchases(data);
        setFilteredPurchases(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching purchases:", error);
        setLoading(false);
      });
  }, []);

  // Filtrar por fecha de compra
  useEffect(() => {
    let filtered = purchases;

    if (dateFilter) {
      filtered = filtered.filter(purchase => purchase.createdAt.startsWith(dateFilter));
    }

    setFilteredPurchases(filtered);
  }, [dateFilter, purchases]);

  if (loading) {
    return <div className="p-6 bg-white shadow-md rounded-lg">Loading purchases...</div>;
  }

  return (
    <div className="bg-white p-6 shadow-md rounded-lg max-h-[400px] overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Purchases</h2>

      {/* Filtro por fecha */}
      <div className="mb-4">
        <input
          type="date"
          className="p-2 border rounded-md"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
      </div>

      {/* Lista de compras */}
      <ul className="space-y-4">
        {filteredPurchases.length === 0 ? (
          <p>No purchases found.</p>
        ) : (
          filteredPurchases.map((purchase) => (
            <li key={purchase.purchaseId} className="p-4 bg-gray-100 rounded-md border border-gray-300">
              <p className="font-bold">Purchase ID: <span className="font-normal">{purchase.purchaseId}</span></p>
              <p className="font-bold">Order ID: <span className="font-normal">{purchase.orderId}</span></p>
              <p className="font-bold">Created At: <span className="font-normal">{new Date(purchase.createdAt).toLocaleString()}</span></p>

              {/* INGREDIENTES COMPRADOS */}
              <p className="font-bold">Ingredients:</p>
              <ul className="ml-4 list-disc">
                {purchase.ingredients.map((ingredient) => (
                  <li key={ingredient.name} className="text-gray-700">
                    {ingredient.name}: Requested {ingredient.requestedQuantity}, Sold {ingredient.quantitySold}
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

export default Purchases;
