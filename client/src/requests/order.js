import { orderEndpoint } from "../utils/configs/api"
import instance from "../utils/configs/instance"
const orderRequest = {
  getByQuery: async query => {
    const order = await instance.get(orderEndpoint.getByQuery, {
      params: {
        ...query,
      },
    })
    return order
  },

  createOrder: async data => {
    const t = await instance.post(orderEndpoint.createOrder, data)
    return t
  },
}
export default orderRequest
