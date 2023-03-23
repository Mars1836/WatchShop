import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import OrderItem from "./order_item.js";
import Address from "./address.js";
const Order = sequelize.define(
  "order",
  {
    totalPrice: {
      type: Sequelize.DECIMAL(10, 2),
    },
    status: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    note: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);
Order.hasMany(OrderItem);
Order.belongsTo(Address);
export default Order;
