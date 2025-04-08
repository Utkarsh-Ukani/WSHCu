import CoItem from "../models/coItems.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// ✅ Valid order statuses
const validStatuses = ["pending", "shipped", "delivered", "cancelled"];
const isValidStatus = (status) => validStatuses.includes(status);

// 🧾 Create Order
export const createOrder = async (req, res) => {
  const { items, addressId } = req.body;

  if (!items || items.length === 0 || !addressId) {
    return res.status(400).json({ message: "Items and address are required" });
  }

  try {
    let totalPrice = 0;
    const coItemIds = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const coItem = await CoItem.create({
        product: item.product,
        quantity: item.quantity
      });

      coItemIds.push(coItem._id);
      totalPrice += (product.discountedPrice || product.price) * item.quantity;

      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      products: coItemIds,
      address: addressId,
      totalPrice,
      status: "pending"
    });

    const populatedOrder = await Order.findById(order._id)
      .populate({ path: "products", populate: { path: "product", model: "Product" } })
      .populate("address");

    res.status(201).json({ order: populatedOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📦 Get Orders of Authenticated User
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate({ path: "products", populate: { path: "product", model: "Product" } })
      .populate("address")
      .lean();

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📦 Get Specific Order by ID
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate({ path: "products", populate: { path: "product", model: "Product" } })
      .populate("address");

    if (!order || order.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 🔁 Update Order Status (User's own order)
export const updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!isValidStatus(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const order = await Order.findOne({ _id: orderId, user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ❌ Cancel Order (User only)
export const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ _id: orderId, user: req.user._id });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (["shipped", "delivered"].includes(order.status)) {
      return res.status(400).json({ message: "Cannot cancel shipped or delivered orders" });
    }

    for (const coItemId of order.products) {
      const coItem = await CoItem.findById(coItemId).populate("product");
      if (coItem && coItem.product) {
        coItem.product.stock += coItem.quantity;
        await coItem.product.save();
        await CoItem.findByIdAndDelete(coItemId);
      }
    }

    await Order.findByIdAndDelete(orderId);

    res.status(200).json({ message: "Order cancelled" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 👑 📦 Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("address")
      .populate({ path: "products", populate: { path: "product", model: "Product" } })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Admin getAllOrders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 👑 📦 Get Orders of a Specific User (Admin)
export const getUserOrdersByAdmin = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await Order.find({ user: userId })
      .populate("address")
      .populate({ path: "products", populate: { path: "product", model: "Product" } })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Admin getUserOrdersByAdmin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 👑 🔁 Update Any User's Order Status (Admin)
export const updateUserOrderStatusByAdmin = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!isValidStatus(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({ message: "Order status updated by admin", order });
  } catch (error) {
    console.error("Admin updateUserOrderStatusByAdmin error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
