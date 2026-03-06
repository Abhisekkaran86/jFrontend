import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all orders (admin-only route)
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

  // Update status of an order
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(); // Refresh orders after update
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Orders (Admin Panel)</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "20px",
              padding: "15px",
              borderRadius: "5px",
              background: "#f9f9f9",
            }}
          >
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>User:</strong> {order.user.name} ({order.user.email})</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> ₹{order.total}</p>

            <p><strong>Products:</strong></p>
            <ul>
              {order.products.map((prod, idx) => (
                <li key={idx}>
                  Product ID: {prod.productId}, Quantity: {prod.quantity}, Price: ₹{prod.price}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "10px" }}>
              <label><strong>Update Status: </strong></label>
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
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
