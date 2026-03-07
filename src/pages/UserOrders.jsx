import React, { useEffect, useState } from "react";
import API from "../utils/api";

const UserOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));

      const { data } = await API.get("/orders/my", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setMyOrders(data);
    } catch (err) {
      console.error("My Orders Error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setLoading(true);
      await API.delete(`/orders/${orderId}`);
      alert("Order cancelled successfully.");
      fetchMyOrders();
    } catch (err) {
      console.error("Cancel Order Error:", err.response?.data || err.message);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  if (loading) return <div className="text-center py-10">Loading orders...</div>;
  if (!myOrders.length) return <div className="text-center py-10">No orders found.</div>;

  return (
    <div className="max-w-[900px] mx-auto p-10 bg-yellow-50 rounded-xl shadow-lg">

      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        My Orders
      </h2>

      <ul className="space-y-6">

        {myOrders.map((order) => (
          <li
            key={order._id}
            className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-400 p-6 rounded-xl shadow-md hover:-translate-y-1 hover:shadow-lg transition"
          >

            <div className="text-sm">
              <strong>Order ID:</strong> {order._id}
            </div>

            <div className="my-3 font-medium text-yellow-900">
              <strong>Shipping Address:</strong> {order.address}
            </div>

            <div>
              <strong>Products:</strong>

              <ul className="mt-3 space-y-3">

                {order.products.map(({ product, quantity }) => (
                  <li
                    key={product._id}
                    className="flex items-center bg-yellow-50 border border-yellow-300 p-3 rounded-lg"
                  >

                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-[60px] h-[60px] object-cover rounded"
                    />

                    <div className="ml-3 text-sm text-yellow-900">
                      <div>{product.title}</div>
                      <div>Price: ${product.price.toFixed(2)}</div>
                      <div>Quantity: {quantity}</div>
                    </div>

                  </li>
                ))}

              </ul>
            </div>

            <button
              className={`mt-5 px-5 py-2 rounded-md text-white text-sm font-medium transition
              ${
                order.status === "cancelled"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => cancelOrder(order._id)}
              disabled={loading || order.status === "cancelled"}
            >
              {order.status === "cancelled" ? "Cancelled" : "Cancel Order"}
            </button>

          </li>
        ))}

      </ul>
    </div>
  );
};

export default UserOrders;