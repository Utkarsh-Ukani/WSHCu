import Cart from "../models/cart.model.js";
import CoItem from "../models/coItems.model.js";

// ✅ Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products",
      populate: { path: "product", model: "Product" }
    });

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: { cart }
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Add to Cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ success: false, message: "Please provide productId and quantity" });
  }

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, products: [] });
    }

    // Check if the product already exists in the cart
    const existingCoItem = await CoItem.findOne({ product: productId, _id: { $in: cart.products } });

    if (existingCoItem) {
      existingCoItem.quantity += quantity;
      await existingCoItem.save();
    } else {
      const newCoItem = await CoItem.create({ product: productId, quantity });
      cart.products.push(newCoItem._id);
      await cart.save();
    }

    const populatedCart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products",
      populate: { path: "product", model: "Product" }
    });

    return res.status(200).json({
      success: true,
      message: "Item added to cart",
      data: { cart: populatedCart }
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Remove from Cart
export const removeFromCart = async (req, res) => {
  const { coItemId } = req.params;

  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { $pull: { products: coItemId } },
      { new: true }
    );

    await CoItem.findByIdAndDelete(coItemId);

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products",
      populate: { path: "product", model: "Product" }
    });

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      data: { cart: updatedCart }
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Update Cart Item
export const updateCart = async (req, res) => {
  const { coItemId, quantity } = req.body;

  if (!coItemId || !quantity) {
    return res.status(400).json({ success: false, message: "Please provide coItemId and quantity" });
  }

  try {
    const coItem = await CoItem.findById(coItemId);
    if (!coItem) return res.status(404).json({ success: false, message: "Cart item not found" });

    coItem.quantity = quantity;
    await coItem.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate({
      path: "products",
      populate: { path: "product", model: "Product" }
    });

    return res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: { cart: updatedCart }
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Clear Cart
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    await CoItem.deleteMany({ _id: { $in: cart.products } });

    cart.products = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
      data: { cart }
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
