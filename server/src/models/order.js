import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import OrderItem from "./order_item.js";
import Address from "./address.js";
import UserProfile from "./user_profile.js";
const Order = sequelize.define(
  "order",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    totalPrice: {
      type: Sequelize.DECIMAL(10, 2),
    },
    status: {
      type: DataTypes.ENUM(
        "Pending",
        "Confirmed",
        "Processing",
        "Dispatched",
        "OnDelivery",
        "Completed",
        "Rejected",
        "Refunded"
      ),
      defaultValue: "Pending",
    },
    phone: { type: Sequelize.STRING },
    note: {
      type: Sequelize.STRING,
    },
  },
  {
    timestamps: true,
  }
);
Order.hasMany(OrderItem);
Order.hasOne(Address);
export default Order;
