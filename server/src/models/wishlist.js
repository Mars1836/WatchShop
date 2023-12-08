import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Product from "./product.js";
const WishList = sequelize.define(
  "wishlist",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
  },
  {
    timestamps: false,
  }
);
WishList.belongsTo(Product);
export default WishList;
