import User from "../models/user.js";
import UserProfile from "../models/user_profile.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import { Address } from "../models/user_profile.js";
const userCtrl = {
  create: async (req, res) => {
    try {
      const newUser = await User.create(req.body)
        .then((user) => {
          return UserProfile.create({
            ...req.body.profile,

            userId: user.id,
          }).then((userProfile) => {
            Address.create({
              userProfileId: userProfile.id,
            });
            Cart.create({
              userProfileId: userProfile.id,
            });
            Order.create({
              userProfileId: userProfile.id,
            });
          });
        })
        .catch((error) => {
          throw error;
        });

      res.status(200).json("successed");
    } catch (error) {
      res.status(500).json(error);
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
