const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, default: 0 },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  variants: [variantSchema],
  categories: [{ // Add the categories field
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category' // Reference the Category model
  }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
