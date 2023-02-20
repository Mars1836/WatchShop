import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import Product from "./product.js";
const CartItem = sequelize.define(
  "cart_item",
  {
    quantity: Sequelize.INTEGER,
  },
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
CartItem.belongsTo(Product);
export default CartItem;
