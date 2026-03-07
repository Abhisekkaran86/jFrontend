

import { useEffect, useState } from "react";
import API from "../utils/api";
import "../style/AdminDashboard.css";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null); // For update mode

  const fetchProducts = () => {
    API.get("/products").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const resetForm = () => {
    setForm({ name: "", title: "", description: "", price: "" });
    setImage(null);
    setEditingId(null);
  };

  const saveProduct = async () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    if (image) {
      formData.append("image", image);
    }

    try {
      if (editingId) {
        // Update product
        await API.put(`/products/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated");
      } else {
        // Add new product
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Error saving product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error.response);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      title: product.title,
      description: product.description,
      price: product.price,
    });
    setEditingId(product._id);
    setImage(null);
    window.scrollTo(0, 0); // scroll to form
  };

  return (
    <div className="admin-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="form-card">
        <h3>{editingId ? "Update Product" : "Add New Product"}</h3>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (₹)"
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <label className="upload-label">
          Upload Image:
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </label>
        <button onClick={saveProduct}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
        {editingId && <button onClick={resetForm}>Cancel</button>}
      </div>

      <h3>All Products</h3>
      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p._id}>
            <img src={p.image} alt={p.name} />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <p className="desc">{p.description}</p>
            <div>
              <button onClick={() => handleEdit(p)}>Edit</button>
              <button onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
