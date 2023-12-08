import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
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
