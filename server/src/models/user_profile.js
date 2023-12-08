import { sequelize } from "./index.js";
import { Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Cart from "./cart.js";
import Feedback from "./feedback.js";
import Order from "./order.js";
import User from "./user.js";
import WishList from "./wishlist.js";
import Address from "./address.js";
const UserProfile = sequelize.define(
  "user_profile",
  {
    id: {
      type: DataTypes.UUID, // Set the data type as UUID
      primaryKey: true, // Mark it as the primary key
      defaultValue: () => uuidv4(), // Use a function to generate a UUID as the default value
    },
    name: { type: Sequelize.STRING },
    phone: { type: Sequelize.STRING },
    avatar: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
  },
  {
    // viết một số option tại đây
    timestamps: true, // ở đây mình không muốn tạo createdAt và updatedAt
  }
);
UserProfile.belongsTo(Address);
UserProfile.hasMany(Feedback);
Feedback.hasOne(UserProfile);
UserProfile.hasOne(Cart);
UserProfile.hasOne(WishList);
UserProfile.hasMany(Order);
UserProfile.belongsTo(User);
Order.belongsTo(UserProfile);
User.hasOne(UserProfile);
export default UserProfile;
