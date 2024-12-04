const db = require("../models/index.js");
const SalesSummary = db.sales_summary;
const Payment = db.payments;
const sequelize = db.sequelize;
const queries = require("./queries.js");
const paymentProcess = async (req, res) => {
  const { amount, clientName, saleId } = req.body;
  try {
    const sale = await SalesSummary.findOne({
      where: { client_name: clientName, id: saleId },
      // order: [["sale_date", "DESC"]], // only the most recent sale
    });
    if (!sale) {
      return res
        .status(404)
        .json({ message: `No sales found for client: ${clientName}` });
    }
    const payment = await Payment.create({
      sale_id: sale.id,
      amount_paid: amount,
    });
    res.status(201).json({ message: "payment recorded successfully", payment });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};
const clientHistoryPayment = async (req, res) => {
  const { clientName } = req.params;
  try {
    if (!clientName)
      return res.status(400).send("client name should be provided!");
    const sales = await SalesSummary.findAll({
      where: { client_name: clientName },
      order: [["sale_date", "DESC"]], // Order by most recent sale first
      include: [
        {
          model: Payment, // Include payments for each sale
          as: "payments",
          attributes: ["amount_paid", "payment_date"], // Fetch specific fields
        },
      ],
    });
    const results = await sequelize.query(queries.clientPay, {
      replacements: { clientName: clientName },
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).json({ sales, results });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "internal server issue" });
  }
};
module.exports = { paymentProcess, clientHistoryPayment };
