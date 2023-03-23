// import { sequelize } from "./index.js";
// import Sequelize from "sequelize";
// import UserProfile from "./user_profile.js";

// const Address = sequelize.define(
//   "address",
//   {
//     district: { type: Sequelize.STRING },
//     city: { type: Sequelize.STRING },
//     ward: { type: Sequelize.STRING },
//     locate: { type: Sequelize.STRING },
//   },
//   {
//     // viết một số option tại đây
//     timestamps: false, // ở đây mình không muốn tạo createdAt và updatedAt
//   }
// );
// Address.belongsTo(UserProfile);
// export default Address;
import { sequelize } from "./index.js";
import Sequelize from "sequelize";
const Address = sequelize.define(
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
export default Address;
