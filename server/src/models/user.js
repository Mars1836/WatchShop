import { sequelize } from "./index.js";
import Sequelize from "sequelize";
const User = sequelize.define(
  "user",
  {
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
export default User;
