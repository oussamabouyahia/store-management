const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const Payments = sequelize.define(
    "payments",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      sale_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "sales_summary",
          key: "id",
        },
      },
      amount_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "payments",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "sale_id",
          using: "BTREE",
          fields: [{ name: "sale_id" }],
        },
      ],
    }
  );
  Payments.associate = function (models) {
    Payments.belongsTo(models.sales_summary, {
      foreignKey: "sale_id",
      as: "sale", // Alias
    });
  };
  return Payments;
};
