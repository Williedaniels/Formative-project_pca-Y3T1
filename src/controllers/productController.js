const Product = require('../models/Product'); // Assuming you have a Product model

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update basic product fields
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.categories = req.body.categories;

    // Handle variants
    const newVariants = req.body.variants || [];
    const existingVariants = product.variants;

    // Update or add variants
    for (const newVariant of newVariants) {
      const existingVariant = existingVariants.id(newVariant._id);
      if (existingVariant) {
        // Update existing variant
        Object.assign(existingVariant, newVariant);
      } else {
        // Add new variant
        product.variants.push(newVariant);
      }
    }

    // Remove variants that are not in the request body
    for (const existingVariant of existingVariants) {
      const newVariant = newVariants.find(v => v._id === existingVariant._id.toString());
      if (!newVariant) {
        existingVariant.remove();
      }
    }

    await product.save();
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error: error.message });
  }
};

// Patch a product
exports.patchProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update only the fields provided in the request body
    for (const key in req.body) {
      if (key === 'variants') {
        const newVariants = req.body.variants || [];
        const existingVariants = product.variants;

        // Update or add variants
        for (const newVariant of newVariants) {
          const existingVariant = existingVariants.id(newVariant._id);
          if (existingVariant) {
            // Update existing variant
            Object.assign(existingVariant, newVariant);
          } else {
            // Add new variant
            product.variants.push(newVariant);
          }
        }

        // Remove variants that are not in the request body
        for (const existingVariant of existingVariants) {
          const newVariant = newVariants.find(v => v._id === existingVariant._id.toString());
          if (!newVariant) {
            existingVariant.remove();
          }
        }
      } else {
        product[key] = req.body[key];
      }
    }

    await product.save();
    res.status(200).json({ message: 'Product patched successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error patching product', error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error: error.message });
  }
};

// Add a variant to a product
exports.addVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    product.variants.push(req.body);
    await product.save();
    res.status(201).json({ message: 'Variant added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding variant', error });
  }
};

// Update a variant
exports.updateVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const variant = product.variants.id(req.params.variantId);
    if (!variant) {
      return res.status(404).json({ message: 'Variant not found' });
    }
    Object.assign(variant, req.body);
    await product.save();
    res.status(200).json({ message: 'Variant updated successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error updating variant', error });
  }
};

// Delete a variant
exports.deleteVariant = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const variant = product.variants.id(req.params.variantId);
    if (!variant) {
      return res.status(404).json({ message: 'Variant not found' });
    }
    variant.remove();
    await product.save();
    res.status(200).json({ message: 'Variant deleted successfully', product });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting variant', error });
  }
};
