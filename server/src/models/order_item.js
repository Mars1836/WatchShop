import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import Product from "./product.js";
const OrderItem = sequelize.define(
  "order_item",
  {
    price: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
  },
  {
    timestamps: false,
  }
);
OrderItem.belongsTo(Product);
export default OrderItem;
