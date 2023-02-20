import express from "express";
import UserProfile from "../models/user_profile.js";
import userProfileCtrl from "../controllers/user_profile.js";
const userProfileRouter = express.Router();
userProfileRouter.get("/get-all");
userProfileRouter.get("/get-cart", userProfileCtrl.getCart);
userProfileRouter.get("/get-wishlist", userProfileCtrl.getWishList);
userProfileRouter.post(
  "/toggle-wishlist",
  userProfileCtrl.toggleProductInWishList
);
userProfileRouter.post("/add-to-cart", userProfileCtrl.addProductToCart);
userProfileRouter.delete(
  "/remove-from-cart",
  userProfileCtrl.removeProductInCart
);
userProfileRouter.patch("/update-cart", userProfileCtrl.updateCart);
userProfileRouter.patch("/update-address", userProfileCtrl.updateAddress);
userProfileRouter.patch("/update-profile", userProfileCtrl.updateProfile);

export default userProfileRouter;
