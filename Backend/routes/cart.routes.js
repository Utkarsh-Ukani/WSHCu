import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCart,
} from "../controllers/cart.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const cartRouter = express.Router();

// ✅ Apply JWT middleware to all cart routes
cartRouter.use(verifyJWT);

// All routes below are now protected
cartRouter.get("/", getCart); 
cartRouter.post("/add", addToCart);
cartRouter.put("/update", updateCart); 
cartRouter.delete("/remove/:coItemId", removeFromCart);
cartRouter.delete("/clear", clearCart);

export default cartRouter;
