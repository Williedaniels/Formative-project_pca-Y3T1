const { body } = require('express-validator');

exports.validateCategory = [
  body('name').notEmpty().withMessage('Category name is required')
];