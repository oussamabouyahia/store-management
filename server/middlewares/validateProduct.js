const { check, validationResult } = require("express-validator");

const validateProduct = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Product name must be a string"),
  check("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  check("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0"),
  check("category").notEmpty().withMessage("Category is required"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
module.exports = validateProduct;
