const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const db = require("./models/index.js");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// Routes
app.use("/product", require("./routes/product.js"));
app.use("/sale", require("./routes/sale.js"));
app.use("/payment", require("./routes/payment.js"));

// Start the server

db.sequelize
  .sync() // Sync the models with the database
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected and Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to start the server:", error);
  });
