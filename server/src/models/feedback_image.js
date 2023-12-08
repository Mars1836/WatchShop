import { sequelize } from "./index.js";
import Product from "./product.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const FeedbackImage = sequelize.define(
  "feedback_image",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    public_id: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "default_public_id",
    },
    url: Sequelize.STRING,
  },
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
export default FeedbackImage;
