import { sequelize } from "./index.js";
import Sequelize from "sequelize";

const Product = sequelize.define(
  "product",
  {
    name: { type: Sequelize.STRING },
    price: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
    detail: { type: Sequelize.TEXT },
    gender: { type: Sequelize.STRING },
    discount: { type: Sequelize.DECIMAL(10, 2) },
    img: { type: Sequelize.STRING },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
export const Tag = sequelize.define(
  "tag",
  {
    value: { type: Sequelize.STRING },
  },
  {
    timestamps: false,
  }
);
export const Category = sequelize.define(
  "category",
  {
    value: { type: Sequelize.STRING },
  },
  {
    timestamps: false,
  }
);
Product.belongsToMany(Tag, { through: "product_tags" });
Tag.belongsToMany(Product, { through: "product_tags" });
Product.belongsToMany(Category, { through: "product_categories" });
Category.belongsToMany(Product, { through: "product_categories" });
export default Product;
