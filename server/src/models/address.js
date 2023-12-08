import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
const Address = sequelize.define(
  "address",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    district: { type: Sequelize.STRING },
    city: { type: Sequelize.STRING },
    ward: { type: Sequelize.STRING },
    location: { type: Sequelize.STRING },
  },
  {
    // viết một số option tại đây
    timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
export default Address;
