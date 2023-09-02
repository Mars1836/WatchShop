import { cartEndpoint } from "../../utils/configs/api";
import instance from "../../utils/configs/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { useCookies } from "react-cookie";

const actionCart = {
  localLoginSuccess: (state, action) => {
    state.data = action.payload.user;
    state.token = action.payload.token;
  },
};
const actionCartApi = {
  getCart: createAsyncThunk("cart/getCart", async () => {
    const response = await instance.get(cartEndpoint.getCart);
    return response.data;
  }),
  removeFromCart: createAsyncThunk(
    "cart/removeFromCart",
    async (cartItemId) => {
      await instance.delete(cartEndpoint.removeFromCart, {
        data: {
          cartItemId,
        },
      });

      return cartItemId;
    }
  ),
  addToCart: createAsyncThunk("cart/addToCart", async (productId) => {
    const cartItem = await instance.post(cartEndpoint.addToCart, {
      productId,
    });
    return cartItem.data;
  }),
  updateQuantityInCart: createAsyncThunk(
    "cart/updateQuantityInCart",
    async (carts) => {
      const cartItem = await instance.patch(
        cartEndpoint.updateQuantityInCart,
        carts
      );
      return cartItem.data;
    }
  ),
};

export { actionCart, actionCartApi };
