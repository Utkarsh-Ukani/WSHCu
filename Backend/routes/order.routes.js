import express from 'express';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus, cancelOrder } from '../controllers/order.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const orderRouter = express.Router();

// Apply JWT middleware to all routes
orderRouter.use(verifyJWT);

// Protected Routes
orderRouter.post("/", createOrder);
orderRouter.get("/", getUserOrders);
orderRouter.get("/:orderId", getOrderById);
orderRouter.put("/:orderId", updateOrderStatus);
orderRouter.delete("/:orderId", cancelOrder);

export default orderRouter;