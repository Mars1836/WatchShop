import express from "express";
import UserProfile from "../models/user_profile.js";
import userProfileCtrl from "../controllers/user_profile.js";
import verifyAsUser from "../middlewares/require_auth.js";
const userProfileRouter = express.Router();

userProfileRouter.get("/get-cart", verifyAsUser, userProfileCtrl.getCart);
userProfileRouter.get(
  "/get-wishlist",
  verifyAsUser,
  userProfileCtrl.getWishList
);
userProfileRouter.post(
  "/toggle-wishlist",
  verifyAsUser,
  userProfileCtrl.toggleProductInWishList
);
userProfileRouter.post(
  "/add-to-cart",
  verifyAsUser,
  userProfileCtrl.addProductToCart
);
userProfileRouter.delete(
  "/remove-from-cart",
  verifyAsUser,
  userProfileCtrl.removeProductInCart
);
userProfileRouter.patch(
  "/update-cart",
  verifyAsUser,
  userProfileCtrl.updateCart
);
userProfileRouter.patch(
  "/update-address",
  verifyAsUser,
  userProfileCtrl.updateAddress
);
userProfileRouter.patch(
  "/update-profile",
  verifyAsUser,
  userProfileCtrl.updateProfile
);
userProfileRouter.delete(
  "/reset-cart",
  verifyAsUser,
  userProfileCtrl.resetCart
);
userProfileRouter.get("/:userProfileId", userProfileCtrl.getById);
export default userProfileRouter;
