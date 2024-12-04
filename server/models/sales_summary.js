const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  const SalesSummary = sequelize.define(
    "sales_summary",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sale_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      client_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "sales_summary",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
  SalesSummary.associate = function (models) {
    SalesSummary.hasMany(models.payments, {
      foreignKey: "sale_id",
      as: "payments", // Alias
    });
  };

  return SalesSummary;
};
