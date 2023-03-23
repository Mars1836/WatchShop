import { orderEndpoint } from "../utils/configs/api";
import instance from "../utils/configs/instance";
const orderRequest = {
  getOrder: async () => {
    const order = await instance.get(orderEndpoint.getOrder);
    return order;
  },

  placeOrder: async (data) => {
    const t = await instance.post(orderEndpoint.placeOrder, data);
  },
};
export default orderRequest;
