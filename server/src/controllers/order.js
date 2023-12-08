import Order from "../models/order.js";
import Address from "../models/address.js";
import OrderItem from "../models/order_item.js";
import { handleQueryInput } from "../utils/helper.js";
import Product from "../models/product.js";
import { ORDER_STATUS } from "../utils/consts.js";
const orderCtrl = {
  getById: async (req, res) => {
    const params = req.params;
    try {
      const data = await Order.findOne({
        where: {
          id: params.orderId,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  getByQuery: async (req, res) => {
    const { _findAll, ...query } = req.query;
    const [query1, query2] = handleQueryInput(query);
    try {
      if (_findAll) {
        const data = await Order.findAll({
          where: {
            ...query1,
            ...query2,
            userProfileId: req.profile.id,
          },
          include: [
            { model: OrderItem, include: [{ model: Product }] },
            { model: Address },
          ],
        });
        return res.status(200).json(data);
      }
      const data = await Order.findOne({
        where: {
          ...query1,
          ...query2,
          userProfileId: req.profile.id,
        },
        include: [
          { model: OrderItem, include: [{ model: Product }] },
          { model: Address },
        ],
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  create: async (req, res) => {
    try {
      const { orderItems, ...orderData } = req.body;
      const order = await Order.create(
        {
          ...orderData,
          userProfileId: req.profile.id,
        },
        {
          include: [Address],
        }
      );
      await OrderItem.bulkCreate(
        orderItems.map((items, index) => {
          return {
            ...orderItems[index],
            orderId: order.id,
          };
        })
      );

      res.json("success");
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },
  getByStatus: async (req, res) => {
    const params = req.params;
    console.log(params);
    try {
      const orders = await Order.findAll({
        where: {
          status: params.status,
          userProfileId: req.profile.id,
        },
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json(error?.message || error);
    }
  },

  empty: () => {},
};
export default orderCtrl;
