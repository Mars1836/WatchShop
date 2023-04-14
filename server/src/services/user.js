import User from "../models/user.js";
import UserProfile from "../models/user_profile.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import CryptoJS from "crypto-js";
import Address from "../models/address.js";
const userService = {
  localCreate: async (data) => {
    const { username, password, ...profile } = data;
    var passwordEncrypted = CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET_KEY
    ).toString();
    try {
      const address = await Address.create({});
      const newUser = await User.create({
        type: "local",
        username,
        password: passwordEncrypted,
      })
        .then((user) => {
          return UserProfile.create({
            addressId: address.id,
            ...profile,
            userId: user.id,
          }).then((userProfile) => {
            Cart.create({
              userProfileId: userProfile.id,
            });
          });
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  },
  googleCreate: async (profile) => {
    let googleProfile = {
      name: profile.displayName,
      id: profile.id,
      email: profile.emails[0].value,
      avatar: profile.photos[0].value,
    };
    const address = await Address.create({});

    const newUser = await User.create({
      type: "google",
      external_type: "google",
      external_id: googleProfile.id,
    })
      .then((user) => {
        return UserProfile.create({
          addressId: address.id,
          name: googleProfile.name,
          avatar: googleProfile.avatar,
          userId: user.id,
          email: googleProfile.email,
        }).then((userProfile) => {
          Cart.create({
            userProfileId: userProfile.id,
          });
        });
      })
      .catch((error) => {
        throw error;
      });
  },
};
export default userService;
