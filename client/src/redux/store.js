import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import CartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
const reducer = {
  user: userReducer,
  product: productReducer,
  cart: CartReducer,
  wishlist: wishlistReducer,
};
const store = configureStore({
  reducer,
});
export default store;
