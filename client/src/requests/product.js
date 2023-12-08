import { productEndpoint } from "../utils/configs/api"
import instance from "../utils/configs/instance"
const productRequest = {
  getByQuery: async query => {
    const order = await instance.get(productEndpoint.getByQuery, {
      params: {
        ...query,
      },
    })
    return order
  },
}
export default productRequest
