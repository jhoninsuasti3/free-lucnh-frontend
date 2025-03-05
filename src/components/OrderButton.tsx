
const OrderButton = ({ placeOrder }: { placeOrder: () => void }) => {
  return (
    <button 
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md"
      onClick={placeOrder}
    >
      Order Random Dish
    </button>
  );
};

export default OrderButton;