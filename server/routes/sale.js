const express = require("express");
const router = express.Router();
const saleController = require("../controllers/sales");
router
  .route("/")
  .post(saleController.processSale)
  .get(saleController.salesDetails);
router.get("/summary", saleController.salesSummaryList);
router.get("/summary/:clientName", saleController.summaryByClient);
module.exports = router;
