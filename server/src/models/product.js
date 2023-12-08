import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    name: { type: Sequelize.STRING },
    price: { type: Sequelize.INTEGER },
    quantity: { type: Sequelize.INTEGER },
    detail: { type: Sequelize.TEXT },
    gender: { type: Sequelize.STRING },
    discount: { type: Sequelize.INTEGER },
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
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    value: { type: Sequelize.STRING },
  },
  {
    timestamps: false,
  }
);
export const Category = sequelize.define(
  "category",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
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
