const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const dotenv = require('dotenv');

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing data
    await Product.deleteMany();
    await Category.deleteMany();

    // Add dummy categories
    const category1 = new Category({ name: 'Electronics' });
    const category2 = new Category({ name: 'Books' });
    await category1.save();
    await category2.save();

    // Add dummy products
    const products = [
      { name: 'Product 1', price: 100, description: 'Description for Product 1', variants: [{ name: 'Variant 1', price: 100, inventory: 10 }], categories: [category1._id] },
      { name: 'Product 2', price: 200, description: 'Description for Product 2', variants: [{ name: 'Variant 2', price: 200, inventory: 20 }], categories: [category2._id] },
    ];

    await Product.insertMany(products);
    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();
