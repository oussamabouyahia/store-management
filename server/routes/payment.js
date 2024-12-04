const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/pay");

router.route("/").post(paymentController.paymentProcess);
router.route("/:clientName").get(paymentController.clientHistoryPayment);

module.exports = router;
