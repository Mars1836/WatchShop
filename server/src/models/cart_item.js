import { sequelize } from "./index.js";
import Product from "./product.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

const CartItem = sequelize.define(
  "cart_item",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    quantity: Sequelize.INTEGER,
  },
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
CartItem.belongsTo(Product);
export default CartItem;
