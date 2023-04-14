import User from "../models/user.js";
import UserProfile from "../models/user_profile.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";
import CryptoJS from "crypto-js";
import Address from "../models/address.js";
import userService from "../services/user.js";
const userCtrl = {
  localSighUp: async (req, res) => {
    try {
      await userService.localCreate(req.body);
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
