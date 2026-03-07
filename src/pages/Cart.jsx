import React, { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(
    () => JSON.parse(localStorage.getItem("cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleIncrement = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item._id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemove = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const getTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="p-10 font-sans">

      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-6">

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex gap-6 border-b border-gray-300 pb-6"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-[120px] object-cover rounded"
              />

              <div className="flex-1">

                <h3 className="text-lg font-semibold">{item.title}</h3>

                <p className="text-gray-600">
                  Price: ${item.price.toFixed(2)}
                </p>

                <div className="flex items-center gap-3 my-2">

                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    -
                  </button>

                  <span className="font-medium">{item.quantity}</span>

                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                  >
                    +
                  </button>

                </div>

                <p className="text-gray-700">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="text-red-600 font-semibold mt-2 hover:underline"
                  onClick={() => handleRemove(item._id)}
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

      {cart.length > 0 && (
        <div className="mt-8 text-xl font-bold">
          Total: ${getTotal()}
        </div>
      )}
    </div>
  );
}