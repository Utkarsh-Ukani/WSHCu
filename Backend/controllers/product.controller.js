import Product from "../models/product.model.js";

// Add a single product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      quantity,
      description,
      price,
      discountedPrice,
      category,
      image,
      stock,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !quantity ||
      !description ||
      !price ||
      !category ||
      !image ||
      stock === undefined
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const product = new Product({
      name,
      quantity,
      description,
      price,
      discountedPrice: discountedPrice || 0,
      category,
      image,
      stock,
    });

    await product.save();

    return res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add multiple products
export const addMultipleProducts = async (req, res) => {
  try {
    const products = req.body;

    // Check if body is a non-empty array
    if (!Array.isArray(products) || products.length === 0) {
      return res
        .status(400)
        .json({ message: "Please provide an array of products." });
    }

    // Validate required fields in each product
    for (let product of products) {
      const { name, quantity, description, price, category, image, stock } =
        product;

      if (
        !name ||
        !quantity ||
        !description ||
        !price ||
        !category ||
        !image ||
        stock === undefined
      ) {
        return res
          .status(400)
          .json({
            message:
              "Each product must include name, quantity, description, price, category, image, and stock.",
          });
      }
    }

    const insertedProducts = await Product.insertMany(products);

    return res.status(201).json({
      message: `${insertedProducts.length} products added successfully!`,
      products: insertedProducts,
    });
  } catch (error) {
    console.error("Error adding multiple products:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    return res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update product by ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete product by ID
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
