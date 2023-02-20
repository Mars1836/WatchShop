import { productEndpoint } from "../utils/configs/api";
import instance from "../utils/configs/instance";
const productRequest = {
  getAll: async () => {
    const products = await instance.get(productEndpoint.getAll);
    return products;
  },
};
export default productRequest;
