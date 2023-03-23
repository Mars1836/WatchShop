import User from "../models/user.js";
import UserProfile from "../models/user_profile.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import CryptoJS from "crypto-js";
import Address from "../models/address.js";
const userCtrl = {
  create: async (req, res) => {
    try {
      const { username, password, ...profile } = req.body;
      var passwordEncrypted = CryptoJS.AES.encrypt(
        password,
        process.env.PASSWORD_SECRET_KEY
      ).toString();
      const address = await Address.create({});
      const newUser = await User.create({
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
          console.log({
            error,
            username,
            password: passwordEncrypted,
          });
          throw error;
        });

      res.status(200).json("successed");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const user = await User.findAll({ include: UserProfile });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await User.findOne({ where: { id: id } });
      console.log(user.email);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default userCtrl;
