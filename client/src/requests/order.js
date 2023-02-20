import { orderEndpoint } from "../utils/configs/api";
import instance from "../utils/configs/instance";
const orderRequest = {
  getOrder: async () => {
    const order = await instance.get(orderEndpoint.getOrder);
    return order;
  },
  addOrder: async (order) => {
    const t = await instance.post(orderEndpoint.addOrder, order);
    return t;
  },
};
export default orderRequest;
