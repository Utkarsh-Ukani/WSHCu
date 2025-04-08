import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Users</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold">$0</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/admin/products"
          className="bg-blue-500 text-white p-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Products</h2>
          <p>Add, edit, or remove products from your store</p>
        </Link>
        
        <Link
          to="/admin/orders"
          className="bg-green-500 text-white p-6 rounded-lg shadow-md hover:bg-green-600 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Orders</h2>
          <p>View and manage customer orders</p>
        </Link>
        
        <Link
          to="/admin/users"
          className="bg-purple-500 text-white p-6 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p>View and manage user accounts</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard; 