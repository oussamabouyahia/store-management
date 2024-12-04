const { check, validationResult } = require("express-validator");

const validateProductUpdate = [
  check("name")
    .optional() // Field is optional
    .isString()
    .withMessage("Product name must be a string")
    .notEmpty()
    .withMessage("Product name cannot be empty"),
  check("price")
    .optional() // Field is optional
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number greater than 0"),
  check("quantity")
    .optional() // Field is optional
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  check("category")
    .optional() // Field is optional
    .isString()
    .withMessage("Category must be a string")
    .notEmpty()
    .withMessage("Category cannot be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateProductUpdate;
