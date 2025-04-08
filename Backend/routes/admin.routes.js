import express from 'express';
import { addCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from '../controllers/category.controller.js';
import { addMultipleProducts, addProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/product.controller.js';
import { getAllOrders, getUserOrdersByAdmin, updateUserOrderStatusByAdmin } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';

const adminRouter = express.Router();

// Apply JWT and admin middleware to all routes
adminRouter.use(verifyJWT, isAdmin);

// category routes
adminRouter.post('/add-category', addCategory);
adminRouter.get('/get-categories', getCategories);
adminRouter.get('/get-category/:id', getCategoryById); 
adminRouter.put('/update-category/:id', updateCategory); 
adminRouter.delete('/delete-category/:id', deleteCategory); 

// product routes
adminRouter.post('/add-product', addProduct);
adminRouter.post('/add-multiple-products', addMultipleProducts);
adminRouter.get('/get-products', getProducts);
adminRouter.get('/get-product/:id', getProductById);
adminRouter.put('/update-product/:id', updateProduct);
adminRouter.delete('/delete-product/:id', deleteProduct);

// order routes
adminRouter.get('/get-all-orders', getAllOrders);
adminRouter.get('/orders/:userId', getUserOrdersByAdmin);
adminRouter.put('/orders/:orderId', updateUserOrderStatusByAdmin);

export default adminRouter;