import { sequelize } from "./index.js";
import Sequelize from "sequelize";

const Admin = sequelize.define(
  "admin",
  {
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
export default Admin;
