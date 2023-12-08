export const originRoute = "http://localhost:4000"
export const userEndpoint = {
  register: "/api/user/insert",
  localLogin: "/api/login",
  googleLogin: "/api/google-login",
  verifyToken: "/api/verifytoken",
  logout: "/api/logout",
}
export const userProfileEndpoint = {
  getUserProfileById: "/api/user-profile/",
  updateAddress: "/api/user-profile/update-address",
  updateProfile: "/api/user-profile/update-profile",
}
export const productEndpoint = {
  getAll: "/api/product/get-all",
  getById: "/api/product/get/",
  getByQuery: "/api/product",
}
export const cartEndpoint = {
  getCart: "/api/user-profile/get-cart",
  removeFromCart: "/api/user-profile/remove-from-cart",
  addToCart: "/api/user-profile/add-to-cart",
  resetCart: "/api/user-profile/reset-cart",
  updateQuantityInCart: "/api/user-profile/update-cart",
}
export const wishlistEndpoint = {
  getWishList: "/api/user-profile/get-wishlist",
  toggleWishList: "/api/user-profile/toggle-wishlist",
}
export const orderEndpoint = {
  createOrder: "/api/order/",
  getByQuery: "/api/order",
}
export const orderItemEndpoint = {
  getByQuery: "/api/order-item",
}
export const feedbackEndpoint = {
  create: "/api/feedback",
  getByProductId: "/api/feedback/",
}
