import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import axios from 'axios';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, newProduct);
      } else {
        await axios.post('http://localhost:5000/api/products', newProduct);
      }
      dispatch(fetchProducts());
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: '',
        image: '',
        stock: '',
      });
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock,
    });
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        dispatch(fetchProducts());
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Products</h1>

      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={newProduct.category}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={newProduct.stock}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {editingProduct ? 'Update Product' : 'Add Product'}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setNewProduct({
                  name: '',
                  description: '',
                  price: '',
                  category: '',
                  image: '',
                  stock: '',
                });
              }}
              className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-6 rounded-lg shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold mb-2">${product.price}</p>
            <p className="text-gray-600 mb-4">Stock: {product.stock}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts; 