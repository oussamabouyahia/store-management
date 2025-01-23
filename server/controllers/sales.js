const db = require("../models/index.js");
const Product = db.products;
const { Op, Sequelize } = require("sequelize");
const Sale = db.sales;
const SalesSummary = db.sales_summary;
const sequelize = db.sequelize;

const processSale = async (req, res) => {
  const { products, clientName } = req.body; // Array of products for the sale

  try {
    if (!products || products.length === 0) {
      return res
        .status(400)
        .json({ message: "No products provided in the sale" });
    }

    const transaction = await sequelize.transaction();

    try {
      let totalAmount = 0;

      // Step 1: Create a new sale in `sales_summary`
      const salesSummary = await SalesSummary.create(
        { total_amount: 0, client_name: clientName || null }, // Temporary total, will update later
        { transaction }
      );

      const saleId = salesSummary.id;

      // Step 2: Process each product in the sale
      for (const { productId, quantity } of products) {
        const product = await Product.findByPk(productId, { transaction });
        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }

        if (product.quantity < quantity) {
          throw new Error(`Insufficient stock for product ID ${productId}`);
        }

        // Deduct stock and calculate total price
        product.quantity -= quantity;
        await product.save({ transaction });

        const totalPrice = product.price * quantity;
        totalAmount += totalPrice;

        // Add product details to `sales`
        await Sale.create(
          {
            sale_id: saleId,
            product_id: productId,
            quantity_sold: quantity,
            total_price: totalPrice,
          },
          { transaction }
        );
      }

      // Step 3: Update total amount in `sales_summary`
      salesSummary.total_amount = totalAmount;
      await salesSummary.save({ transaction });

      await transaction.commit();

      res.status(201).json({
        message: "Sale processed successfully",
        saleId,
        totalAmount,
      });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const salesDetails = async (req, res) => {
  try {
    const salesList = await Sale.findAll();
    res.status(200).json({ salesList });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};
const salesSummaryList = async (req, res) => {
  try {
    const summaryList = await SalesSummary.findAll();
    res.status(200).json({ summaryList });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};
const summaryByClient = async (req, res) => {
  const { clientName } = req.params;
  try {
    const summaryList = await SalesSummary.findAll({
      where: { client_name: clientName },
    });
    res.status(200).json({ summaryList });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};
const clientsList = async (req, res) => {
  try {
    const clients = await SalesSummary.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("client_name")), "client_name"],
      ],
      where: {
        client_name: {
          [Op.ne]: null,
        },
      },
      raw: true,
    });

    return clients.length
      ? res
          .status(200)
          .json({ clients: clients.map((client) => client.client_name) })
      : res.status(404).send("List of sales clients is empty!");
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server issue" });
  }
};

module.exports = {
  processSale,
  salesDetails,
  salesSummaryList,
  summaryByClient,
  clientsList,
};
