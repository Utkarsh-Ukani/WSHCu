import Category from "../models/category.model.js";
import Product from "../models/product.model.js"; // needed for deletion safety

export const addCategory = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCategory = new Category({
      name,
      description,
      image,
    });

    await newCategory.save();
    return res
      .status(201)
      .json({
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      { name, description, image },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Prevent deletion if any product is associated with this category
    const productCount = await Product.countDocuments({ category: id });
    if (productCount > 0) {
      return res
        .status(400)
        .json({ message: "Cannot delete category with associated products" });
    }

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
