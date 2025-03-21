const Product = require('../models/Product');

exports.getLowStockProducts = async (req, res, next) => {
  try {
    const threshold = parseInt(req.query.threshold) || 10;
    
    const products = await Product.aggregate([
      { $unwind: '$variants' },
      { $match: { 'variants.inventory': { $lt: threshold } } },
      { $group: {
        _id: '$_id',
        name: { $first: '$name' },
        variants: { $push: '$variants' }
      }}
    ]);

    res.json(products);
  } catch (error) {
    next(error);
  }
};
