import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch orders");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        All Orders (Admin Panel)
      </h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg p-5 mb-6 bg-gray-50 shadow-sm"
          >
            <p className="text-sm">
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>

            <p className="text-sm">
              <span className="font-semibold">User:</span> {order.user.name} (
              {order.user.email})
            </p>

            <p className="text-sm">
              <span className="font-semibold">Status:</span>{" "}
              <span className="text-blue-600 font-medium">{order.status}</span>
            </p>

            <p className="text-sm">
              <span className="font-semibold">Address:</span> {order.address}
            </p>

            <p className="text-sm mb-2">
              <span className="font-semibold">Total:</span>{" "}
              <span className="text-yellow-600 font-bold">₹{order.total}</span>
            </p>

            <p className="font-semibold mt-2">Products:</p>

            <ul className="list-disc ml-6 text-sm text-gray-700">
              {order.products.map((prod, idx) => (
                <li key={idx}>
                  Product ID: {prod.productId} | Quantity: {prod.quantity} | Price: ₹{prod.price}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <label className="font-semibold mr-2">Update Status:</label>

              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}