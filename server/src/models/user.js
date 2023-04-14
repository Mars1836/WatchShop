import { sequelize } from "./index.js";
import Sequelize from "sequelize";
const User = sequelize.define(
  "user",
  {
    type: { type: Sequelize.STRING, allowNull: false },
    username: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    external_type: { type: Sequelize.STRING },
    external_id: { type: Sequelize.STRING },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
export default User;
