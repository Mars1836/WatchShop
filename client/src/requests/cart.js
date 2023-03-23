import { cartEndpoint } from "../utils/configs/api";
import instance from "../utils/configs/instance";
const cartRequest = {
  getCart: async () => {
    const cart = await instance.get(cartEndpoint.getCart);
    return cart;
  },
  removeFromCart: async (cartItemId) => {
    const cart = await instance.delete(cartEndpoint.removeFromCart, {
      data: { cartItemId: cartItemId },
    });
    return cart;
  },
  resetCart: async () => {
    const t = await instance.delete(cartEndpoint.resetCart);
    return t;
  },
  addToCart: async (productId) => {
    const product = await instance.post(cartEndpoint.addToCart, {
      productId,
    });
  },
};
export default cartRequest;
