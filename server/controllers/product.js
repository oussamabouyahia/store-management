const db = require("../models/index.js");
const Product = db.products;

const productList = async (req, res) => {
  try {
    const product = await Product.findAll();
    if (product.length == 0) res.status(404).send("no product found yet!");
    res.status(200).json({ message: "here are the products", product });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};

const newProduct = async (req, res) => {
  const { name, price, quantity, category } = req.body;

  try {
    const product = await Product.create({ name, price, quantity, category });
    res.status(201).json({
      message: `The product ${name} was registered successfully`,
      product,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .json({ message: `The product name '${name}' already exists` });
    }
    res
      .status(500)
      .json({ message: "Internal server issue", error: error.message });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, quantity, category } = req.body;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product with ID ${id} not found` });
    }

    await product.update({ name, price, quantity, category });

    res.status(200).json({
      message: `Product with ID ${id} updated successfully`,
      product,
    });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({
        message: `The product name '${name}' is already used by another product. Please choose a different name.`,
      });
    }

    res
      .status(500)
      .json({ message: "Internal server issue", error: error.message });
  }
};
const getOneProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (!product)
      return res.status(404).json({ message: "product not found!" });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};

module.exports = { productList, newProduct, updateProduct, getOneProduct };
