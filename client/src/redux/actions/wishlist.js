import { wishlistEndpoint } from "../../utils/configs/api";
import instance from "../../utils/configs/instance";
import { createAsyncThunk } from "@reduxjs/toolkit";

const actionWishListApi = {
  getWishList: createAsyncThunk("user/getWishList", async () => {
    const response = await instance.get(wishlistEndpoint.getWishList);
    return response.data;
  }),
  toggleWishList: createAsyncThunk("user/toggleWishList", async (productId) => {
    const a = await instance.post(wishlistEndpoint.toggleWishList, {
      productId,
    });

    return a.data;
  }),
};
export { actionWishListApi };
