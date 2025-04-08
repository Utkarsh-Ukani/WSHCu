import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/slices/authSlice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const registerData = { name, email, password };
      await dispatch(register(registerData)).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-b from-black to-gray-200 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 z-20"></div>
        <motion.div 
          className="relative z-30 text-white text-center px-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Join WSH Today</h2>
          <p className="text-lg text-gray-200 max-w-md">
            Create an account to get started with our exclusive products and offers.
          </p>
        </motion.div>
      </div>

      {/* Signup Form Section */}
      <div className="w-full lg:w-1/2 bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
        <motion.div 
          className="w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 className="text-3xl font-bold text-center text-gray-900 mb-8" variants={itemVariants}>
            Create Account
          </motion.h1>

          <motion.div className="bg-white rounded border border-gray-200 p-8 shadow-sm" variants={itemVariants}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                {error}
              </div>
            )}
            <form onSubmit={handleSignup} autoComplete="off">
              {/* Hidden field to trick Chrome autofill */}
              <input type="text" name="fakeusernameremembered" autoComplete="off" style={{ display: 'none' }} />
              <input type="password" name="fakepasswordremembered" autoComplete="new-password" style={{ display: 'none' }} />

              {/* Full Name */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="signup_name"
                    autoComplete="off"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="signup_email"
                    autoComplete="new-email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 mb-2 font-medium">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="signup_password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-2 font-medium">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="signup_confirm_password"
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full py-3 pl-10 pr-3 border border-gray-300 rounded focus:ring-2 focus:ring-gray-200 focus:border-gray-400 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 text-black border-gray-300 rounded focus:ring-gray-400"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-gray-700">
                  I agree to the <a href="#" className="text-black hover:underline">Terms of Service</a> and <a href="#" className="text-black hover:underline">Privacy Policy</a>
                </label>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-black text-white py-3 rounded font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} className="ml-2" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="px-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-700">
              Already have an account?{' '}
              <Link to={'/login'} className="text-black font-medium hover:underline">
                Login
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
