import { sequelize } from "../index.js";
import Sequelize from "sequelize";

const Admin = sequelize.define(
  "admin",
  {
    username: { type: Sequelize.STRING, allowNull: false, unique: true },
    email: { type: Sequelize.STRING, allowNull: false, unique: true },
    password: { type: Sequelize.STRING, allowNull: false, unique: true },
    role: { type: Sequelize.STRING, defaultValue: "user" },
  },
  {
    timestamps: true,
  }
);
export default Admin;
