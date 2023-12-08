import { sequelize } from "./index.js";
import CartItem from "./cart_item.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const Cart = sequelize.define(
  "cart",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
  },
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
Cart.hasMany(CartItem);
export default Cart;
