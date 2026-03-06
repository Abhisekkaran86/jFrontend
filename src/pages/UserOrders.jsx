import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "../style/userOrders.css";

const UserOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch user orders
  // const fetchMyOrders = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await API.get("/orders/my");
  //     setMyOrders(data);
  //   } catch (err) {
  //     console.error("My Orders Error:", err.response?.data || err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchMyOrders = async () => {
  try {
    setLoading(true);

    const user = JSON.parse(localStorage.getItem("user"));

    const { data } = await API.get("/orders/my", {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    setMyOrders(data);
  } catch (err) {
    console.error("My Orders Error:", err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
};

  // Cancel order by id
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      setLoading(true);
      await API.delete(`/orders/${orderId}`);
      alert("Order cancelled successfully.");
      fetchMyOrders(); // Refresh orders
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

  if (loading) return <div>Loading orders...</div>;

  if (!myOrders.length) return <div>No orders found.</div>;

  return (
    <div className="orders-container">
      <h2>My Orders</h2>
      <ul className="orders-list">
        {myOrders.map((order) => (
          <li key={order._id} className="order-card">
            <div>
              <strong>Order ID:</strong> {order._id}
            </div>
            <div className="order-address">
              <strong>Shipping Address:</strong> {order.address}
            </div>
            <div className="order-products">
              <strong>Products:</strong>
              <ul>
                {order.products.map(({ product, quantity }) => (
                  <li key={product._id} className="product-item">
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{ width: 60, height: 60, objectFit: "cover" }}
                    />
                    <div className="product-details">
                      <div>{product.title}</div>
                      <div>Price: ${product.price.toFixed(2)}</div>
                      <div>Quantity: {quantity}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <button
              className="cancel-btn"
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
