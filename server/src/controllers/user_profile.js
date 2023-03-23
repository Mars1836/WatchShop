import db from "../models/index.js";
import Address from "../models/address.js";
import UserProfile from "../models/user_profile.js";
import Cart from "../models/cart.js";
import { decodeJWT } from "../utils/helper.js";
import CartItem from "../models/cart_item.js";
import Product from "../models/product.js";
import WishList from "../models/wishlist.js";
import { Sequelize } from "sequelize";
const userProfileCtrl = {
  create: async (req, res) => {
    const newItem = await UserProfile.create(req.body);

    res.json("success");
  },
  updateCart: async (req, res) => {
    try {
      const ob = req.body;
      const a = await CartItem.bulkCreate(ob, {
        updateOnDuplicate: ["quantity"],
      });
      res.json(a);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    const profiles = await UserProfile.findAll();
    res.status(200).json("successd");
  },
  getWishList: async (req, res) => {
    try {
      const wishlist = await WishList.findAll({
        where: {
          userProfileId: req.userId,
        },
        include: [Product],
      });
      res.status(200).json(wishlist);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  toggleProductInWishList: async (req, res) => {
    const { productId } = req.body;
    console.log(req.body);
    try {
      WishList.findOne({
        where: {
          productId: productId,
          userProfileId: req.userId,
        },
      })
        .then(async (item) => {
          if (!item) {
            WishList.create({
              productId: productId,
              userProfileId: req.userId,
            }).then((wishlist) => {
              return WishList.findOne({
                where: { id: wishlist.id, userProfileId: req.userId },
                include: [Product],
              })
                .then((data) => {
                  res.json({ message: "create_record", wishlist: data });
                  return;
                })
                .catch((error) => {
                  res.status(500).json({
                    message: error.message,
                  });
                });
            });
            return;
          }
          item.destroy().then(() => {
            res.json({ message: "remove_record", wishlist: item });
            return;
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: error.message,
          });
        });
      return;
    } catch (error) {
      res.json(error);
    }
  },
  getCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        where: {
          id: req.userId,
        },
        include: { model: CartItem, include: [Product] },
      });
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addProductToCart: async (req, res) => {
    const { productId } = req.body;
    try {
      const cart = await Cart.findOne({
        where: {
          id: req.userId,
        },
      });

      CartItem.findOne({
        where: {
          cartId: cart.id,
          productId: productId,
        },
      }).then(async (item) => {
        if (!item) {
          CartItem.create({
            cartId: cart.id,
            productId: productId,
            quantity: 1,
          }).then((cartItem) => {
            return CartItem.findOne({
              where: { id: cartItem.id },
              include: [Product],
            }).then((data) => {
              res.json({ message: "create_record", cartItem: data });
              return;
            });
          });
          return;
        }
        item
          .update(
            {
              quantity: (item.quantity || 0) + 1,
            },
            {
              returning: true,
              include: [Product],
            }
          )
          .then((cartItem) => {
            return CartItem.findOne({
              where: { id: cartItem.id },
              include: [Product],
            }).then((data) => {
              res.json({ message: "update_record", cartItem: data });
              return;
            });
          });
      });
      return;
    } catch (error) {
      res.json(error);
    }
  },
  removeProductInCart: async (req, res) => {
    try {
      const { cartItemId } = req.body;

      await CartItem.destroy({
        where: {
          id: cartItemId,
        },
        force: true,
      });
      res.json({
        cartItemId: cartItemId,
        message: "Remove success",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  resetCart: async (req, res) => {
    try {
      const cart = await Cart.findOne({
        where: {
          id: req.userId,
        },
      });
      await CartItem.destroy({
        where: {
          cartId: cart.id,
        },
      });
      res.json("success");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateAddress: async (req, res) => {
    try {
      const { city, location, ward, district } = req.body;
      const address = await Address.update(
        {
          city,
          location,
          district,
          ward,
        },
        {
          where: {
            id: req.profile.addressId,
          },
        }
      );
      res.json({
        message: "update success",
        data: { city, location, ward, district },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateProfile: async (req, res) => {
    try {
      const data = req.body;
      await UserProfile.update(data, {
        where: {
          id: req.userId,
        },
      });
      res.json({
        message: "update success",
        data: data,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default userProfileCtrl;
