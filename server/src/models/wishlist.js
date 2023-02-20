import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import Product from "./product.js";
const WishList = sequelize.define(
  "wishlist",
  {},
  {
    timestamps: false,
  }
);
WishList.belongsTo(Product);
export default WishList;
