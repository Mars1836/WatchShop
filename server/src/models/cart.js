import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import CartItem from "./cart_item.js";
const Cart = sequelize.define(
  "cart",
  {},
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
Cart.hasMany(CartItem);
export default Cart;
