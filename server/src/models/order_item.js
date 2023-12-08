import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Product from "./product.js";
const OrderItem = sequelize.define(
  "order_item",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    price: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
  },
  {
    timestamps: false,
  }
);
OrderItem.belongsTo(Product);
export default OrderItem;
