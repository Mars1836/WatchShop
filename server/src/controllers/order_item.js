import Address from "../models/address.js";
import Order from "../models/order.js";
import OrderItem from "../models/order_item.js";
import Product from "../models/product.js";
import { handleQueryInput } from "../utils/helper.js";
const orderItemCtrl = {
  getOrder: async (req, res) => {
    try {
      const order = await Order.findAll({
        where: {
          userProfileId: req.profile.id,
        },
        include: [
          { model: OrderItem, include: [{ model: Product }] },
          { model: Address },
        ],
      });

      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getByQuery: async (req, res) => {
    const { _findAll, ...query } = req.query;
    const [query1, query2] = handleQueryInput(query);
    try {
      if (_findAll) {
        if (!query.hasOwnProperty("orderId")) {
          return res.status(200).json([]);
        }
        const data = await OrderItem.findAll({
          where: {
            ...query1,
            ...query2,
          },
          include: [{ model: Product }],
        });
        return res.status(200).json(data);
      }
      if (!query.hasOwnProperty("orderId")) {
        return res.status(200).json(null);
      }
      const data = await OrderItem.findOne({
        where: {
          ...query1,
          ...query2,
        },
        include: [{ model: Product }],
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
  updateStatusOrder: () => {},
  orderSuccess: async () => {},
  remove: async (req, res) => {},
};
export default orderItemCtrl;
