import { createSlice } from "@reduxjs/toolkit";
import { actionWishListApi } from "../actions/wishlist";
const wishlistSlice = createSlice({
  name: "wistlist",
  initialState: {
    data: null,
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actionWishListApi.getWishList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      actionWishListApi.getWishList.fulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(actionWishListApi.getWishList.rejected, (state, action) => {
      state.error = action.error;
      state.loading = false;
    });
    //
    builder.addCase(actionWishListApi.toggleWishList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      actionWishListApi.toggleWishList.fulfilled,
      (state, action) => {
        state.loading = false;
        if (action.payload.message === "remove_record") {
          state.data = state.data.filter((item) => {
            return item.id !== action.payload.wishlist.id;
          });
          return;
        }
        if ((action.payload.message = "create_record")) {
          state.data.push(action.payload.wishlist);
        }
      }
    );
    builder.addCase(
      actionWishListApi.toggleWishList.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error;
      }
    );
  },
});
const wishlistReducer = wishlistSlice.reducer;
export const { finishLoading } = wishlistSlice.actions;
export default wishlistReducer;
