import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import Product from "./product.js";
const Feedback = sequelize.define(
  "feedback",
  {
    content: { type: Sequelize.TEXT },
    star: { type: Sequelize.INTEGER },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
Feedback.belongsTo(Product);
export default Feedback;
