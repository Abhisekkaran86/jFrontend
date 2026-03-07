import { useEffect, useState } from "react";
import API from "../utils/api";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    title: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

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
    if (image) formData.append("image", image);

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated");
      } else {
        await API.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product added");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product deleted");
      fetchProducts();
    } catch (error) {
      alert("Failed to delete product");
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
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-[1000px] mx-auto p-6 font-sans text-gray-700">

      {/* Title */}
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Admin Dashboard
      </h2>

      {/* Form */}
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm mb-10">
        <h3 className="text-xl font-semibold mb-5 text-gray-600">
          {editingId ? "Update Product" : "Add New Product"}
        </h3>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price (₹)"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        {/* Upload */}
        <label className="block mb-4 cursor-pointer text-blue-500 font-medium">
          Upload Image
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </label>

        <div>
          <button
            onClick={saveProduct}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg mr-3 transition"
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>

          {editingId && (
            <button
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-3 rounded-lg transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Product List */}
      <h3 className="text-xl font-semibold mb-5">All Products</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-[180px] object-cover rounded-lg mb-3"
            />

            <h4 className="text-lg font-semibold">{p.name}</h4>
            <p className="font-medium text-yellow-600">₹{p.price}</p>

            <p className="text-sm text-gray-500 h-[40px] overflow-hidden mb-2">
              {p.description}
            </p>

            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(p._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}