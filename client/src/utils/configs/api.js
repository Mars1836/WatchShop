export const originRoute = "http://localhost:4000";
export const userEndpoint = {
  register: "/api/user/insert",
  localLogin: "/api/login",
  verifyToken: "/api/verifytoken",
  logout: "/api/logout",
  updateAddress: "/api/user-profile/update-address",
  updateProfile: "/api/user-profile/update-profile",
};
export const productEndpoint = {
  getAll: "/api/product/get-all",
  getById: "/api/product/get/",
};
export const cartEndpoint = {
  getCart: "/api/user-profile/get-cart",
  removeFromCart: "/api/user-profile/remove-from-cart",
  addToCart: "/api/user-profile/add-to-cart",
  resetCart: "/api/user-profile/reset-cart",
  updateQuantityInCart: "/api/user-profile/update-cart",
};
export const wishlistEndpoint = {
  getWishList: "/api/user-profile/get-wishlist",
  toggleWishList: "/api/user-profile/toggle-wishlist",
};
export const orderEndpoint = {
  getOrder: "/api/order-item/get-order",
  placeOrder: "/api/order-item/add-order",
};
