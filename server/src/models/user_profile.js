import { sequelize } from "./index.js";
import Sequelize from "sequelize";
import Cart from "./cart.js";
import Feedback from "./feedback.js";
import Order from "./order.js";
import User from "./user.js";
import WishList from "./wishlist.js";
export const Address = sequelize.define(
  "address",
  {
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
const UserProfile = sequelize.define(
  "user_profile",
  {
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
UserProfile.hasOne(Address);
Address.belongsTo(UserProfile);
UserProfile.hasMany(Feedback);
UserProfile.hasOne(Cart);
UserProfile.hasOne(WishList);
UserProfile.hasOne(Order);
UserProfile.belongsTo(User);
User.hasOne(UserProfile);
export default UserProfile;
