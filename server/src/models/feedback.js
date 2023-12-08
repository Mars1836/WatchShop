import { sequelize } from "./index.js";
import Product from "./product.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import FeedbackImage from "./feedback_image.js";
const Feedback = sequelize.define(
  "feedback",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    content: { type: Sequelize.TEXT },
    star: { type: Sequelize.INTEGER },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
Product.hasMany(Feedback);
Feedback.belongsTo(Product);
Feedback.hasMany(FeedbackImage);
export default Feedback;
