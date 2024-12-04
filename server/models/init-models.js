var DataTypes = require("sequelize").DataTypes;
var _payments = require("./payments");
var _products = require("./products");
var _sales = require("./sales");
var _sales_summary = require("./sales_summary");

function initModels(sequelize) {
  var payments = _payments(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var sales = _sales(sequelize, DataTypes);
  var sales_summary = _sales_summary(sequelize, DataTypes);

  sales.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(sales, { as: "sales", foreignKey: "product_id"});
  payments.belongsTo(sales_summary, { as: "sale", foreignKey: "sale_id"});
  sales_summary.hasMany(payments, { as: "payments", foreignKey: "sale_id"});
  sales.belongsTo(sales_summary, { as: "sale", foreignKey: "sale_id"});
  sales_summary.hasMany(sales, { as: "sales", foreignKey: "sale_id"});

  return {
    payments,
    products,
    sales,
    sales_summary,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
