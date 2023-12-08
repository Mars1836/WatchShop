import { orderItemEndpoint } from "../utils/configs/api"
import instance from "../utils/configs/instance"

const orderItemRequest = {
  getByOrder: async query => {
    const data = await instance.get(orderItemEndpoint.getByQuery, {
      params: {
        ...query,
      },
    })
    return data
  },
}
export default orderItemRequest
