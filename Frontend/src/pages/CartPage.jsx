import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchCart, removeCartItem, updateCartItem } from '../store/slices/cartSlice.js';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateCartItem({ coItemId: itemId, quantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  const handleContinueShopping = () => {
    navigate(-1);
  };

  const subtotal = cart?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = cart?.items?.length > 0 ? 15.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <motion.button
            className="flex items-center text-gray-600 hover:text-black transition-colors"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleContinueShopping}
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>Continue Shopping</span>
          </motion.button>
          <h2 className="text-2xl font-semibold text-center flex-grow">
            Your Cart ({cart?.items?.length || 0})
          </h2>
          <div className="w-32"></div>
        </div>

        {loading && <p>Loading cart...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <motion.div
            className="lg:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {cart?.items?.length === 0 && (
              <p className="text-center text-gray-500 text-lg mt-8">Your cart is empty.</p>
            )}

            {cart?.items?.map((item) => (
              <motion.div
                key={item._id}
                className="bg-white rounded border border-gray-200 mb-4 p-6 flex items-center"
                variants={itemVariants}
                exit={{ opacity: 0, y: -20 }}
                layout
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="ml-6 flex-grow">
                  <h3 className="font-medium text-lg text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 text-sm">
                    Color: {item.color} | Size: {item.size}
                  </p>
                </div>

                <div className="flex items-center mx-4 border border-gray-300 rounded">
                  <motion.button
                    className="px-3 py-1 text-gray-600 hover:text-black"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                  >
                    −
                  </motion.button>
                  <span className="px-3 py-1">{item.quantity}</span>
                  <motion.button
                    className="px-3 py-1 text-gray-600 hover:text-black"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </motion.button>
                </div>

                <div className="font-semibold text-lg mx-6 w-24 text-right">
                  ₹{item.price.toFixed(2)}
                </div>

                <motion.button
                  className="text-gray-500 hover:text-black transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRemoveItem(item._id)}
                >
                  Remove
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            className="lg:w-1/3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white rounded border border-gray-200 p-6 sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between py-4 border-t border-gray-200 font-semibold text-lg">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <motion.button
                className="w-full bg-black text-white py-3 rounded mt-6 flex items-center justify-center font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/checkout')}
              >
                <CreditCard size={18} className="mr-2" />
                Proceed to Checkout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
