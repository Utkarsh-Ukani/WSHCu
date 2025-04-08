import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Home, Package, Truck, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    phone: '',
    
    // Shipping Information
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    
    // Payment Information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your checkout logic here
    console.log('Checkout submission:', formData);
    // Move to next step or complete process
    if (activeStep < 3) {
      setActiveStep(activeStep + 1);
    } else {
      // Handle order completion
      console.log('Order completed!');
    }
  };

  const handleNavigateBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    } else {
      navigate(-1);
    }
  };

  // Sample order summary data
  const orderSummary = {
    items: [
      { id: 1, name: 'Premium T-Shirt', quantity: 2, price: 29.99 },
      { id: 2, name: 'Designer Jeans', quantity: 1, price: 89.99 }
    ],
    subtotal: 149.97,
    shipping: 5.99,
    tax: 15.60,
    total: 171.56
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Order Summary */}
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50 z-20"></div>
        <motion.div 
          className="relative z-30 text-white w-full max-w-md px-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-6">Order Summary</h2>
          
          <div className="bg-[#6bbc51] bg-opacity-40 rounded p-6 backdrop-blur-sm">
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderSummary.items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-100">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>
            
            {/* Order Calculations */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <p className="text-gray-100">Subtotal</p>
                <p>${orderSummary.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-100">Shipping</p>
                <p>${orderSummary.shipping.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-100">Tax</p>
                <p>${orderSummary.tax.toFixed(2)}</p>
              </div>
            </div>
            
            {/* Divider */}
            <div className="border-t border-gray-100 my-4"></div>
            
            {/* Total */}
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>${orderSummary.total.toFixed(2)}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Checkout Form */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        <motion.div 
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {/* Back Button */}
          <motion.button
            className="flex items-center text-gray-600 hover:text-black transition-colors mb-8"
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNavigateBack}
            variants={itemVariants}
          >
            <ArrowLeft size={18} className="mr-2" />
            <span>{activeStep > 1 ? 'Previous Step' : 'Back to Cart'}</span>
          </motion.button>

          {/* Title */}
          <motion.h1 
            className="text-3xl font-bold text-center text-gray-900 mb-4"
            variants={itemVariants}
          >
            Checkout
          </motion.h1>

          {/* Progress Indicator */}
          <motion.div 
            className="flex justify-between items-center mb-8 px-4"
            variants={itemVariants}
          >
            <div className={`flex flex-col items-center ${activeStep >= 1 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${activeStep >= 1 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                {activeStep > 1 ? <Check size={16} /> : <User size={16} />}
              </div>
              <span className="text-xs font-medium">Contact</span>
            </div>
            
            <div className={`flex-grow border-t-2 mx-2 ${activeStep >= 2 ? 'border-black' : 'border-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${activeStep >= 2 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${activeStep >= 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                {activeStep > 2 ? <Check size={16} /> : <Truck size={16} />}
              </div>
              <span className="text-xs font-medium">Shipping</span>
            </div>
            
            <div className={`flex-grow border-t-2 mx-2 ${activeStep >= 3 ? 'border-black' : 'border-gray-200'}`}></div>
            
            <div className={`flex flex-col items-center ${activeStep >= 3 ? 'text-black' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mb-1 ${activeStep >= 3 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>
                <CreditCard size={16} />
              </div>
              <span className="text-xs font-medium">Payment</span>
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div 
            className="bg-white rounded border border-gray-200 p-8 shadow-sm"
            variants={itemVariants}
          >
            <form onSubmit={handleSubmit}>
              {/* Step 1: Contact Information */}
              {activeStep === 1 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
                  
                  {/* Email Field */}
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Phone Field */}
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full py-3 pl-3 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        placeholder="(123) 456-7890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Shipping Information */}
              {activeStep === 2 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                  
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-2 font-medium">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2 font-medium">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Address Field */}
                  <div className="mb-6">
                    <label htmlFor="address" className="block text-gray-700 mb-2 font-medium">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Home size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        placeholder="123 Main St, Apt 4B"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* City, Zip Code, Country */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2 font-medium">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-700 mb-2 font-medium">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Country Field */}
                  <div className="mb-6">
                    <label htmlFor="country" className="block text-gray-700 mb-2 font-medium">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Information */}
              {activeStep === 3 && (
                <div>
                  <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                  
                  {/* Card Name Field */}
                  <div className="mb-6">
                    <label htmlFor="cardName" className="block text-gray-700 mb-2 font-medium">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  {/* Card Number Field */}
                  <div className="mb-6">
                    <label htmlFor="cardNumber" className="block text-gray-700 mb-2 font-medium">
                      Card Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CreditCard size={18} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Expiry Date and CVV */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="expiryDate" className="block text-gray-700 mb-2 font-medium">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-gray-700 mb-2 font-medium">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        className="w-full py-3 px-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Save Card Checkbox */}
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="saveCard"
                      name="saveCard"
                      className="h-4 w-4 text-black border-gray-300 rounded focus:ring-gray-400"
                      checked={formData.saveCard}
                      onChange={handleChange}
                    />
                    <label htmlFor="saveCard" className="ml-2 block text-gray-700">
                      Save card for future purchases
                    </label>
                  </div>
                  
                  {/* Order Summary for Mobile Only */}
                  <div className="block lg:hidden mb-6">
                    <h3 className="text-lg font-semibold mb-3">Order Summary</h3>
                    <div className="bg-gray-100 p-4 rounded">
                      <div className="flex justify-between font-medium mb-2">
                        <span>Subtotal</span>
                        <span>${orderSummary.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Shipping</span>
                        <span>${orderSummary.shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Tax</span>
                        <span>${orderSummary.tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-300 my-2"></div>
                      <div className="flex justify-between font-bold mt-2">
                        <span>Total</span>
                        <span>${orderSummary.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Next/Complete Button */}
              <motion.button
                type="submit"
                className="w-full bg-black text-white py-3 rounded font-medium flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeStep < 3 ? 'Continue' : 'Complete Order'}
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;