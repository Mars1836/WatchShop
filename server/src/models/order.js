import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import OrderItem from "./order_item.js";
const Order = sequelize.define(
  "order",
  {},
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
Order.hasMany(OrderItem);
export default Order;
