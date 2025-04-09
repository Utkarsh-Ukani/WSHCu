import express from 'express';

const orderRouter = express.Router();

// Protected Routes
router.post("/", verifyJWT, createOrder);
router.get("/", verifyJWT, getUserOrders);
router.get("/:orderId", verifyJWT, getOrderById);
router.put("/:orderId", verifyJWT, updateOrderStatus);
router.delete("/:orderId", verifyJWT, cancelOrder);

export default orderRouter;